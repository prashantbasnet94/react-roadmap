# Build Your Own Virtual DOM

**Goal:** Understand how React works under the hood by building a simplified version of its core engine.

## Concepts Covered
1.  **Hyperscript (`h`)**: A function to create virtual nodes (Javascript Objects).
2.  **Mounting**: Rendering the virtual DOM into the real DOM.
3.  **Diffing (Patching)**: Comparing two virtual trees and updating only what changed.

## Instructions

1.  Open `index.html` in your browser.
2.  Open `vdom.js` to see the logic.
3.  Try adding a new element to the `myApp` function in `index.html`.
4.  Notice how the timer updates without flashing the entire page? That's the Virtual DOM in action!

## The Algorithm

### 1. `h(tag, props, children)`
Creates a plain object:
```js
{ tag: 'div', props: { id: 'app' }, children: [...] }
```

### 2. `mountVNode(vnode, container)`
Recursively creates DOM nodes from the `vnode` object and appends them to the container.

### 3. `patch(oldVNode, newVNode)`
*   **Case 1**: Nodes are different tags? -> Replace entire node.
*   **Case 2**: Same tag? -> Update props, then recurse and patch children.
*   **Case 3**: Text node? -> Update text content if changed.

## Why is this "Virtual"?
We are operating on *Plain JavaScript Objects* first. We only touch the expensive `document` API when we determine a change represents a difference between the old description and the new description.
