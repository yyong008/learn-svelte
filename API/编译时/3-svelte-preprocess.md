# svelte.preprocess

```js
result: {
	code: string,
	dependencies: Array<string>
} = svelte.preprocess(
	source: string,
	preprocessors: Array<{
		markup?: (input: { content: string, filename: string }) => Promise<{
			code: string,
			dependencies?: Array<string>
		}>,
		script?: (input: { content: string, attributes: Record<string, string>, filename: string }) => Promise<{
			code: string,
			dependencies?: Array<string>
		}>,
		style?: (input: { content: string, attributes: Record<string, string>, filename: string }) => Promise<{
			code: string,
			dependencies?: Array<string>
		}>
	}>,
	options?: {
		filename?: string
	}
)
```

该 preprocess 函数为任意转换组件源代码提供了方便的钩子。例如，它可以用于将`<style lang="sass">`块转换为原始 CSS。

第一个参数是组件源代码。第二个是的阵列的预处理器（或单个预处理，如果只有一个），其中，一个预处理器是与对象 markup，script 和 style 功能，其中每一个是可选的。

每个 markup，script 或 style 函数必须返回一个对象（或一个无极解析到的对象）与 code 属性，表示变换后的源代码，和一个可选的阵列 dependencies。

该 markup 函数将接收整个组件源文本，以及 filename 在第三个参数中指定的组件的源文本。

```js
const svelte = require('svelte/compiler')

const { code } = svelte.preprocess(
  source,
  {
    markup: ({ content, filename }) => {
      return {
        code: content.replace(/foo/g, 'bar'),
      }
    },
  },
  {
    filename: 'App.svelte',
  }
)
```

预处理器函数可以另外 map 在 code 和旁边返回一个对象 dependencies，其中 map 是表示转换的源映射。在当前版本的 Svelte 中，它将被忽略，但是将来的 Svelte 版本可能会考虑预处理器源映射。

的 script 和 style 功能接收的内容`<script>`和`<style>`分别的元件。除之外 filename，它们还获得元素属性的对象。

如果 dependencies 返回数组，它将包含在结果对象中。例如，在标签带有的情况下，等程序包将使用此功能监视其他文件的更改。`<style>` `@import`。

```js
const svelte = require('svelte/compiler')
const sass = require('node-sass')
const { dirname } = require('path')

const { code, dependencies } = svelte.preprocess(
  source,
  {
    style: async ({ content, attributes, filename }) => {
      // only process <style lang="sass">
      if (attributes.lang !== 'sass') return

      const { css, stats } = await new Promise((resolve, reject) =>
        sass.render(
          {
            file: filename,
            data: content,
            includePaths: [dirname(filename)],
          },
          (err, result) => {
            if (err) reject(err)
            else resolve(result)
          }
        )
      )

      return {
        code: css.toString(),
        dependencies: stats.includedFiles,
      }
    },
  },
  {
    filename: 'App.svelte',
  }
)
```

多个预处理器可以一起使用。第一个的输出成为第二个的输入。markup函数首先运行，然后运行script和style。

```js
const svelte = require('svelte/compiler');

const { code } = svelte.preprocess(source, [
	{
		markup: () => {
			console.log('this runs first');
		},
		script: () => {
			console.log('this runs third');
		},
		style: () => {
			console.log('this runs fifth');
		}
	},
	{
		markup: () => {
			console.log('this runs second');
		},
		script: () => {
			console.log('this runs fourth');
		},
		style: () => {
			console.log('this runs sixth');
		}
	}
], {
	filename: 'App.svelte'
});
```