# layout

到目前为止，我们已经将页面视为完全独立的组件-在导航时，现有组件将被销毁，而新组件将取代它。

但是在许多应用程序中，有些元素应该在每个页面上可见，例如顶级导航或页脚。我们可以使用布局组件，而不是在每个页面中都重复它们。

要创建适用于每个页面的布局组件，请创建一个名为的文件src/routes/_layout.svelte。默认的布局组件（Sapper如果不带自己的组件，则使用该组件）如下所示：

```html
<slot></slot>
```

...但是我们可以添加所需的任何标记，样式和行为。例如，让我们添加一个导航栏：

```html
<!-- src/routes/_layout.svelte -->
<nav>
  <a href=".">Home</a>
  <a href="about">About</a>
  <a href="settings">Settings</a>
</nav>

<slot></slot>
```

如果我们为和创建网页/，则.../about/settings

```html
<!-- src/routes/index.svelte -->
<h1>Home</h1>
<!-- src/routes/about.svelte -->
<h1>About</h1>
<!-- src/routes/settings.svelte -->
<h1>Settings</h1>
```

...导航栏将始终可见，并且在三页之间单击只会导致`<h1>`被替换。

## 嵌套路线

假设我们不仅有一个/settings页面，而且有嵌套的页面（例如）/settings/profile和/settings/notifications共享的子菜单（有关真实示例，请参见）。

我们可以创建仅适用于以下页面的布局/settings（同时使用顶级导航继承根布局）：

```html
<!-- src/routes/settings/_layout.svelte -->
<h1>Settings</h1>

<div class="submenu">
  <a href="settings/profile">Profile</a>
  <a href="settings/notifications">Notifications</a>
</div>

<slot></slot>
```

布局组件接收一个segment属性，该属性对于样式等事情很有用：

```xml
+<script>
+    export let segment;
+</script>
+
<div class="submenu">
-    <a href="settings/profile">Profile</a>
-    <a href="settings/notifications">Notifications</a>
+    <a
+        class:selected={segment === "profile"}
+        href="settings/profile"
+    >Profile</a>
+
+    <a
+        class:selected={segment === "notifications"}
+        href="settings/notifications"
+    >Notifications</a>
</div>
```
