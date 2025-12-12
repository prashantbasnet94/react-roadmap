// 1. Create Virtual Node (h function)
// Returns a lightweight object representation of a DOM node
function h(tag, props, children) {
    return {
        tag,
        props: props || {},
        children: children || []
    };
}

// 2. Mount: Turn VDOM -> Real DOM
function mount(vnode, container) {
    // Handle text nodes/strings
    if (typeof vnode === 'string' || typeof vnode === 'number') {
        const textNode = document.createTextNode(vnode);
        container.appendChild(textNode);
        return textNode;
    }

    // Create the actual element
    const el = document.createElement(vnode.tag);

    // Set attributes (props)
    for (const key in vnode.props) {
        el.setAttribute(key, vnode.props[key]);
    }

    // Handle children
    // If children is a string/number, it's just text content
    if (typeof vnode.children === 'string' || typeof vnode.children === 'number') {
        el.textContent = vnode.children;
    } else if (Array.isArray(vnode.children)) {
        // Recursively mount children
        vnode.children.forEach(child => mount(child, el));
    }

    // Save range on vnode for future reference (optional but helpful for patching)
    vnode.$el = el;

    container.appendChild(el);
    return el;
}

// 3. Patch: Compare Old vs New VDOM and update only what changed
function patch(n1, n2) {
    // If nodes are strictly equal, do nothing
    if (n1 === n2) return n2.$el = n1.$el;

    // Case 0: If one is text and they are different, update text
    if (typeof n1 !== 'object' || typeof n2 !== 'object') {
        if (n1 !== n2) {
            // In a full impl we'd replace the node, but for simplicity let's assume parent handles this
            // or we are just updating text content if mapped correctly.
            // Simplification: Text node replacement usually handled by parent during diffing or
            // via specific text wrappers.
            // For this mini-demo, let's assume we are diffing elements mainly.
        }
        return;
    }

    const el = (n2.$el = n1.$el);

    // Case 1: Different tags? Replace the whole thing
    if (n1.tag !== n2.tag) {
        const newEl = mount(n2, el.parentNode);
        el.parentNode.replaceChild(newEl, el);
        return newEl;
    }

    // Case 2: Same tag? Update props and text/children

    // 2a. Update Props
    // (Simplification: just add/update new props)
    for (const key in n2.props) {
        if (n1.props[key] !== n2.props[key]) {
            el.setAttribute(key, n2.props[key]);
        }
    }
    // (Simplification: remove old props not in new - skipped for brevity)

    // 2b. Update Children
    const oldChildren = n1.children;
    const newChildren = n2.children;

    if (typeof newChildren === 'string') {
        if (oldChildren !== newChildren) {
            el.textContent = newChildren;
        }
    } else if (Array.isArray(newChildren)) {
        if (Array.isArray(oldChildren)) {
            // Recurse: Diff common length
            const commonLen = Math.min(oldChildren.length, newChildren.length);
            for (let i = 0; i < commonLen; i++) {
                patch(oldChildren[i], newChildren[i]);
            }

            // If new has more items, mount them
            if (newChildren.length > oldChildren.length) {
                newChildren.slice(oldChildren.length).forEach(child => {
                    mount(child, el);
                });
            }
            // If old has more items, remove them (skipped for brevity)
        } else {
            // Old was text, new is array -> clear and mount new
            el.textContent = '';
            newChildren.forEach(child => mount(child, el));
        }
    }
}

// Export for usage
window.MiniReact = {
    createElement: h,
    mount,
    patch
};
