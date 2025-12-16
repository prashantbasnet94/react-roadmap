# Day 6: Events & Synthetic Events - Theory Questions

**Study Time:** 2 hours
**Date Started:** ___________

---

## 🎯 Questions to Master

### Q12: What is the difference between HTML and React event handling?

**Your Answer:**
```
[Write your answer here]
```

**Key Differences:**

| Aspect | HTML | React |
|--------|------|-------|
| **Naming** | lowercase | camelCase |
| **Value** | string | function reference |
| **Prevent default** | return false | event.preventDefault() |
| **this binding** | N/A | Must bind in class components |

**HTML Event Handling:**
```html
<!-- lowercase, string -->
<button onclick="handleClick()">
  Click me
</button>

<!-- Prevent default with return false -->
<a href="#" onclick="handleClick(); return false;">
  Link
</a>
```

**React Event Handling:**
```jsx
// camelCase, function reference
<button onClick={handleClick}>
  Click me
</button>

// Prevent default explicitly
<a href="#" onClick={(e) => {
  e.preventDefault();
  handleClick();
}}>
  Link
</a>
```

**More Examples:**

```jsx
// HTML
<input onchange="handleChange()" />
<div onclick="handleClick()" />
<form onsubmit="handleSubmit()" />

// React
<input onChange={handleChange} />
<div onClick={handleClick} />
<form onSubmit={handleSubmit} />
```

**Binding in Class Components:**
```javascript
class Button extends React.Component {
  constructor(props) {
    super(props);
    // Must bind in constructor
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log(this); // Now 'this' refers to component
  }

  render() {
    return <button onClick={this.handleClick}>Click</button>;
  }
}

// Or use arrow function (auto-binds)
class Button extends React.Component {
  handleClick = () => {
    console.log(this); // Automatically bound
  }

  render() {
    return <button onClick={this.handleClick}>Click</button>;
  }
}
```

---

### Q13: What are synthetic events in React?

**Your Answer:**
```
[Write your answer here]
```

**Definition:**
```
Cross-browser wrapper around browser's native event.
Same interface as native events, but works consistently across browsers.
```

**Why Synthetic Events?**

```javascript
// Native events differ across browsers:
// IE: window.event
// Others: event parameter

// React normalizes this:
function handleClick(e) {
  // 'e' is a SyntheticEvent
  // Works same in all browsers!
  console.log(e.type);      // "click"
  console.log(e.target);    // DOM element
  console.log(e.currentTarget);
}
```

**Properties of SyntheticEvent:**
```javascript
function handleEvent(e) {
  // Same API as native events
  e.type              // Event type: 'click', 'change', etc.
  e.target            // Element that triggered event
  e.currentTarget     // Element event listener is attached to
  e.preventDefault()  // Prevent default behavior
  e.stopPropagation() // Stop bubbling
  e.nativeEvent       // Access underlying native event

  // Browser-specific properties normalized:
  e.clientX, e.clientY
  e.pageX, e.pageY
  e.shiftKey, e.ctrlKey, e.metaKey
}
```

**Important: Event Pooling (React 16 and earlier)**
```javascript
function handleClick(e) {
  // ⚠️ In React 16:
  setTimeout(() => {
    console.log(e.type); // null! Event was pooled
  }, 100);

  // Solution: persist the event
  e.persist();
  setTimeout(() => {
    console.log(e.type); // Works now
  }, 100);
}

// ✅ React 17+: No more pooling!
function handleClick(e) {
  setTimeout(() => {
    console.log(e.type); // Works! No need to persist
  }, 100);
}
```

**Accessing Native Event:**
```javascript
function handleClick(e) {
  // Get native event if needed
  const nativeEvent = e.nativeEvent;

  // Usually not needed, but available
  console.log(nativeEvent.type);
}
```

---

### Q44: How are events different in React?

**Your Answer:**
```
[Write your answer here]
```

**Comprehensive Differences:**

#### 1. **Event Delegation**
```javascript
// Native JS: Attach to each element
document.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', handleClick);
});

// React: Attaches to root (since React 17)
<div>
  <button onClick={handleClick}>Button 1</button>
  <button onClick={handleClick}>Button 2</button>
  {/* React attaches ONE listener to root, not to each button */}
</div>
```

#### 2. **Automatic Binding in Function Components**
```javascript
// Native JS
const button = document.querySelector('button');
button.addEventListener('click', function() {
  console.log(this); // The button element
});

// React - arrow functions (this not needed)
function Component() {
  const handleClick = () => {
    console.log(this); // undefined in strict mode
    // Use closures instead
  };
  return <button onClick={handleClick}>Click</button>;
}
```

#### 3. **Can't Return False to Prevent Default**
```javascript
// Native JS/HTML
<a href="#" onclick="return false;">Link</a>

// React - must call preventDefault
<a href="#" onClick={(e) => {
  e.preventDefault(); // Must be explicit
  return false;       // Doesn't work in React
}}>Link</a>
```

#### 4. **Event Object is Normalized**
```javascript
// Works consistently across browsers
function handleEvent(e) {
  // Always available:
  e.target
  e.currentTarget
  e.type
  e.preventDefault()
  e.stopPropagation()
}
```

#### 5. **Passive Events by Default (for scroll)**
```javascript
// React automatically uses passive for scroll/touch
// Can't prevent default on scroll
<div onScroll={(e) => {
  e.preventDefault(); // Doesn't work! Scroll is passive
}}>
  Scrollable content
</div>
```

---

### Q54: What are the pointer events supported in React?

**Your Answer:**
```
[Write your answer here]
```

**Pointer Events (Unified Mouse/Touch/Pen):**

```javascript
function Component() {
  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      Touch/Click/Pen me
    </div>
  );
}
```

**Pointer Event Properties:**
```javascript
function handlePointer(e) {
  e.pointerId      // Unique ID for pointer
  e.pointerType    // "mouse", "touch", or "pen"
  e.isPrimary      // Is this the primary pointer?
  e.pressure       // Pressure (0.0 to 1.0)
  e.tiltX, e.tiltY // Pen tilt
  e.width, e.height // Contact geometry
}
```

**Why Use Pointer Events?**
```javascript
// ❌ Old way - separate handlers
<div
  onMouseDown={handleMouseDown}
  onTouchStart={handleTouchStart}
>

// ✅ New way - unified handler
<div onPointerDown={handlePointerDown}>
  {/* Works for mouse, touch, AND pen! */}
</div>
```

**Example: Drawing App**
```javascript
function DrawingCanvas() {
  const [isDrawing, setIsDrawing] = useState(false);

  const handlePointerDown = (e) => {
    setIsDrawing(true);
    // Start drawing at e.clientX, e.clientY
  };

  const handlePointerMove = (e) => {
    if (isDrawing) {
      // Draw line to e.clientX, e.clientY
      // Works with mouse, touch, or pen!
    }
  };

  const handlePointerUp = () => {
    setIsDrawing(false);
  };

  return (
    <canvas
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    />
  );
}
```

---

### Q186: How to pass an event handler to a component?

**Your Answer:**
```
[Write your answer here]
```

**Method 1: Pass as Prop (Most Common)**
```javascript
function Parent() {
  const handleClick = (message) => {
    console.log('Clicked:', message);
  };

  return <Child onButtonClick={handleClick} />;
}

function Child({ onButtonClick }) {
  return (
    <button onClick={() => onButtonClick('Hello')}>
      Click me
    </button>
  );
}
```

**Method 2: Prop Drilling (Multiple Levels)**
```javascript
function GrandParent() {
  const handleClick = () => console.log('Clicked');

  return <Parent onClick={handleClick} />;
}

function Parent({ onClick }) {
  return <Child onClick={onClick} />;
}

function Child({ onClick }) {
  return <button onClick={onClick}>Click</button>;
}
```

**Method 3: Context (Avoid Prop Drilling)**
```javascript
const EventContext = createContext();

function Parent() {
  const handleClick = () => console.log('Clicked');

  return (
    <EventContext.Provider value={handleClick}>
      <Child />
    </EventContext.Provider>
  );
}

function Child() {
  const handleClick = useContext(EventContext);
  return <button onClick={handleClick}>Click</button>;
}
```

**Method 4: With Parameters**
```javascript
function Parent() {
  const handleDelete = (id) => {
    console.log('Delete:', id);
  };

  return (
    <div>
      <Item id={1} onDelete={handleDelete} />
      <Item id={2} onDelete={handleDelete} />
    </div>
  );
}

function Item({ id, onDelete }) {
  return (
    <button onClick={() => onDelete(id)}>
      Delete {id}
    </button>
  );
}
```

---

### Q187: How to prevent function from being called multiple times?

**Your Answer:**
```
[Write your answer here]
```

**Method 1: Debouncing**
```javascript
import { useCallback, useRef } from 'react';

function useDebounce(callback, delay) {
  const timeoutRef = useRef(null);

  return useCallback((...args) => {
    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);
}

// Usage
function SearchInput() {
  const handleSearch = useDebounce((query) => {
    console.log('Searching for:', query);
    // API call
  }, 500);

  return (
    <input
      onChange={(e) => handleSearch(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

**Method 2: Throttling**
```javascript
function useThrottle(callback, delay) {
  const lastRun = useRef(Date.now());

  return useCallback((...args) => {
    const now = Date.now();

    if (now - lastRun.current >= delay) {
      callback(...args);
      lastRun.current = now;
    }
  }, [callback, delay]);
}

// Usage
function ScrollHandler() {
  const handleScroll = useThrottle(() => {
    console.log('Scrolled');
    // Only fires every 200ms max
  }, 200);

  return <div onScroll={handleScroll}>Scrollable</div>;
}
```

**Method 3: Disable Button After Click**
```javascript
function SubmitButton() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      await submitForm();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <button
      onClick={handleSubmit}
      disabled={isSubmitting}
    >
      {isSubmitting ? 'Submitting...' : 'Submit'}
    </button>
  );
}
```

**Method 4: Once Flag**
```javascript
function Component() {
  const hasRunRef = useRef(false);

  const handleClick = () => {
    if (hasRunRef.current) return; // Already ran

    hasRunRef.current = true;
    console.log('Only runs once');
  };

  return <button onClick={handleClick}>Click once</button>;
}
```

---

### Q251: What are capture phase events?

**Your Answer:**
```
[Write your answer here]
```

**Event Phases:**

```
1. CAPTURE phase (top → down)
2. TARGET phase
3. BUBBLE phase (bottom → up)
```

**Visual:**
```
     Document
        ↓ CAPTURE
       Div
        ↓ CAPTURE
      Button (TARGET)
        ↑ BUBBLE
       Div
        ↑ BUBBLE
     Document
```

**React Capture Events (Rare):**
```javascript
function Component() {
  return (
    <div
      onClickCapture={() => console.log('1. Div capture')}
      onClick={() => console.log('3. Div bubble')}
    >
      <button
        onClickCapture={() => console.log('2. Button capture')}
        onClick={() => console.log('4. Button bubble')}
      >
        Click
      </button>
    </div>
  );
}

// Click button, logs:
// 1. Div capture     (top → down)
// 2. Button capture  (top → down)
// 4. Button bubble   (bottom → up)
// 3. Div bubble      (bottom → up)
```

**All Capture Events:**
```javascript
<div
  onClickCapture={...}
  onChangeCapture={...}
  onFocusCapture={...}
  onBlurCapture={...}
  onKeyDownCapture={...}
  onMouseDownCapture={...}
  // ... add "Capture" to any event
>
```

**When to Use Capture:**
- Implement event delegation manually
- Intercept events before they reach target
- Logging/analytics before event handled
- Rare! Usually use bubble phase (default)

---

### OQ3: How to bind methods or event handlers in JSX callbacks?

**Your Answer:**
```
[Write your answer here]
```

**Problem in Class Components:**
```javascript
class Component extends React.Component {
  handleClick() {
    console.log(this); // undefined! 'this' not bound
  }

  render() {
    return <button onClick={this.handleClick}>Click</button>;
  }
}
```

**Solution 1: Bind in Constructor (Best for Performance)**
```javascript
class Component extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log(this); // Bound correctly
  }

  render() {
    return <button onClick={this.handleClick}>Click</button>;
  }
}
```

**Solution 2: Arrow Function in Render (Simpler, Slight Performance Cost)**
```javascript
class Component extends React.Component {
  handleClick() {
    console.log(this); // Bound correctly
  }

  render() {
    return (
      <button onClick={() => this.handleClick()}>
        Click
      </button>
    );
    // ⚠️ Creates new function every render
  }
}
```

**Solution 3: Class Property with Arrow Function (Recommended)**
```javascript
class Component extends React.Component {
  // Arrow function auto-binds
  handleClick = () => {
    console.log(this); // Always correct
  }

  render() {
    return <button onClick={this.handleClick}>Click</button>;
  }
}
```

**Solution 4: Bind Inline (Not Recommended)**
```javascript
render() {
  return (
    <button onClick={this.handleClick.bind(this)}>
      Click
    </button>
  );
  // ⚠️ Creates new function every render
}
```

**Function Components (No Binding Needed):**
```javascript
function Component() {
  const handleClick = () => {
    // No 'this' to bind!
  };

  return <button onClick={handleClick}>Click</button>;
}
```

---

### OQ4 & OQ73: How to pass parameters to event handlers?

**Your Answer:**
```
[Write your answer here]
```

**Method 1: Arrow Function Wrapper**
```javascript
function TodoList({ todos }) {
  const deleteTodo = (id) => {
    console.log('Delete:', id);
  };

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.text}
          <button onClick={() => deleteTodo(todo.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
```

**Method 2: Data Attributes (For Simple Values)**
```javascript
function TodoList({ todos }) {
  const deleteTodo = (e) => {
    const id = e.currentTarget.dataset.id;
    console.log('Delete:', id);
  };

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.text}
          <button data-id={todo.id} onClick={deleteTodo}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
```

**Method 3: Currying**
```javascript
function TodoList({ todos }) {
  const deleteTodo = (id) => (e) => {
    console.log('Delete:', id);
    console.log('Event:', e);
  };

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.text}
          <button onClick={deleteTodo(todo.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
```

**Method 4: bind (Class Components)**
```javascript
class TodoList extends React.Component {
  deleteTodo(id, e) {
    console.log('Delete:', id);
  }

  render() {
    return (
      <ul>
        {this.props.todos.map(todo => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={this.deleteTodo.bind(this, todo.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    );
  }
}
```

---

### OQ16 & OQ47: Common Mistakes & Programmatic Triggers

**OQ16: Common mistake of function being called every time**

```javascript
// ❌ Wrong - calls function immediately!
<button onClick={handleClick()}>
  Click
</button>
// handleClick() is called during render

// ✅ Right - passes function reference
<button onClick={handleClick}>
  Click
</button>

// ✅ With parameters - use arrow function
<button onClick={() => handleClick(id)}>
  Click
</button>
```

**OQ47: How to programmatically trigger click event?**

```javascript
function Component() {
  const buttonRef = useRef();

  useEffect(() => {
    // Trigger click programmatically
    buttonRef.current.click();
  }, []);

  return (
    <button ref={buttonRef} onClick={() => console.log('Clicked!')}>
      Auto-click on mount
    </button>
  );
}

// Or dispatch custom event
const event = new MouseEvent('click', {
  bubbles: true,
  cancelable: true,
});
element.dispatchEvent(event);
```

---

### OQ58: Why no error boundaries for event handlers?

**Your Answer:**
```
[Write your answer here]
```

**Reason:**
```
Error boundaries catch errors during RENDERING.
Event handlers run AFTER rendering.
```

**Error Boundaries Catch:**
- Render method errors
- Lifecycle method errors
- Constructor errors
- Errors in child components

**Error Boundaries DON'T Catch:**
- Event handler errors ← THIS
- Async code errors (setTimeout, promises)
- Server-side rendering errors
- Errors in the error boundary itself

**Solution: try-catch in Event Handlers:**
```javascript
function Component() {
  const handleClick = async () => {
    try {
      await riskyOperation();
    } catch (error) {
      // Handle error manually
      console.error(error);
      setError(error);
    }
  };

  return <button onClick={handleClick}>Click</button>;
}
```

---

## 📝 Summary Notes

**Synthetic events in one sentence:**
```
[Your explanation]
```

**Event delegation pattern:**
```
[How React handles it]
```

**When to use capture phase:**
```
[Rare use cases]
```

---

## ✅ Self-Check

- [ ] Understand HTML vs React event differences
- [ ] Know what synthetic events are and why
- [ ] Can list how events are different in React
- [ ] Know pointer events and when to use them
- [ ] Can pass event handlers as props
- [ ] Can prevent multiple function calls (debounce/throttle)
- [ ] Understand event phases (capture/bubble)
- [ ] Know how to bind methods (class components)
- [ ] Can pass parameters to event handlers
- [ ] Avoid common event handler mistakes
- [ ] Understand error boundary limitations

---

## 🎯 Interview Practice Questions

### 1. "Explain React's synthetic event system"
**Time:** 3-4 minutes

### 2. "How do you optimize event handlers in React?"
**Time:** 2-3 minutes

### 3. "What's the difference between debounce and throttle?"
**Time:** 2 minutes

---

**Study Progress:**
- Started: ___________
- Completed: ___________
- Ready for hands-on: [ ]
