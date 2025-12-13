# Day 3: JSX & Components Deep Dive - Theory Questions

**Study Time:** 2 hours
**Date Started:** ___________

---

## 🎯 Questions to Master

### Q4: What is JSX?

**Your Answer:**
[Write your answer here]
```

**Key Points to Cover:**
- **Definition:** JavaScript XML - syntax extension for JavaScript
- **Purpose:** Write HTML-like markup in JavaScript
- **Not HTML:** It's JavaScript that looks like HTML
- **Compiled:** Transpiled to JavaScript by Babel
- **Optional:** You can use React without JSX (but why would you?)

**JSX Example:**
```jsx
const element = <h1 className="greeting">Hello, world!</h1>;
```

**Compiles to:**
```javascript
// Old transform (React 17 and earlier)
const element = React.createElement(
  'h1',
  { className: 'greeting' },
  'Hello, world!'
);

// New transform (React 17+)
import { jsx as _jsx } from 'react/jsx-runtime';
const element = _jsx('h1', {
  className: 'greeting',
  children: 'Hello, world!'
});
```

**Why JSX?**
- Easier to visualize UI structure
- Familiar HTML syntax
- Less verbose than `createElement`
- Catches errors at compile time
- Better IDE support

---

### Q5: What is the difference between an Element and a Component?

**Your Answer:**
```
[Write your answer here]
```

**Key Differences:**

| Aspect | Element | Component |
|--------|---------|-----------|
| **What is it?** | Plain object describing DOM node | Function or class that returns elements |
| **Type** | Data (object) | Blueprint/Template (function/class) |
| **Created by** | JSX or React.createElement | You write it |
| **Can render?** | No, it IS what gets rendered | Yes, it returns elements |
| **Reusable?** | No | Yes |
| **Has state?** | No | Yes (components can) |

**Examples:**

#### Element (Result)
```javascript
// This IS an element (a plain object)
const element = <h1>Hello</h1>;

// Under the hood:
{
  type: 'h1',
  props: {
    children: 'Hello'
  },
  key: null,
  ref: null
}
```

#### Component (Blueprint)
```javascript
// This IS a component (a function)
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>; // Returns an element
}

// Usage - creates an element from component
const element = <Welcome name="Sara" />;
```

**Mental Model:**
```
Component = Factory
Element = Product of the factory

Component is called → Returns element → Element describes UI
```

---

### Q6: How do you create components in React?

**Your Answer:**
```
[Write your answer here]
```

**Three Ways:**

#### 1. Function Components (Recommended)
```javascript
// Simple function
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// Arrow function
const Welcome = (props) => {
  return <h1>Hello, {props.name}</h1>;
};

// Concise arrow function
const Welcome = ({ name }) => <h1>Hello, {name}</h1>;
```

#### 2. Class Components (Legacy, but still used)
```javascript
import React, { Component } from 'react';

class Welcome extends Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

#### 3. React.memo (HOC for performance)
```javascript
const Welcome = React.memo(function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
});

// Or with arrow function
const Welcome = React.memo(({ name }) => (
  <h1>Hello, {name}</h1>
));
```

**Component Rules:**
- Must return JSX (or null, string, number, array)
- Name must start with capital letter
- Can accept props
- Should be pure (same input → same output)

---

### Q7: When should you use a Class Component over a Function Component?

**Your Answer:**
```
[Write your answer here]
```

**Short Answer (2024):**
```
Almost never. Use function components with Hooks.
```

**The Reality:**

| Scenario | Use Class? | Use Function? |
|----------|-----------|--------------|
| New code | ❌ No | ✅ Yes (with Hooks) |
| Legacy codebase | Maybe | Preferred |
| Error boundaries | ✅ Yes* | ❌ Not yet** |
| Personal preference | Your choice | Most teams prefer |

**\*Error Boundaries - Only valid reason:**
```javascript
// No Hook equivalent for this yet
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
```

**\*\*Coming soon:** Error boundary Hook is in development

**Why Function Components Won:**
- Simpler syntax
- Easier to test
- Better performance (no instance creation)
- Hooks are more powerful than lifecycle methods
- Easier to extract logic (custom hooks)
- Less boilerplate

---

### Q8: What are Pure Components?

**Your Answer:**
```
[Write your answer here]
```

**Definition:**
```
Component that only re-renders when props or state actually change
Uses shallow comparison to decide
```

**Class-based Pure Component:**
```javascript
import React, { PureComponent } from 'react';

class MyComponent extends PureComponent {
  render() {
    console.log('Rendered!');
    return <div>{this.props.name}</div>;
  }
}

// Behavior:
<MyComponent name="John" /> // Renders
<MyComponent name="John" /> // Doesn't re-render (same prop)
<MyComponent name="Jane" /> // Renders (prop changed)
```

**Function Component Pure Version:**
```javascript
import React, { memo } from 'react';

const MyComponent = memo(function MyComponent({ name }) {
  console.log('Rendered!');
  return <div>{name}</div>;
});

// Or with custom comparison
const MyComponent = memo(
  function MyComponent({ name }) {
    return <div>{name}</div>;
  },
  (prevProps, nextProps) => {
    // Return true if props are equal (skip render)
    return prevProps.name === nextProps.name;
  }
);
```

**How Shallow Comparison Works:**
```javascript
// Shallow comparison checks:
prevProps.name === nextProps.name  // ✅ Primitive values
prevProps.obj === nextProps.obj    // ✅ Reference equality

// ⚠️ Gotcha with objects:
const obj1 = { value: 1 };
const obj2 = { value: 1 };
obj1 === obj2  // false! Different references

// This will always re-render:
<MyComponent data={{ value: 1 }} /> // New object each render
```

**When to Use Pure Components:**
- Component receives same props frequently
- Component is expensive to render
- Rendering large lists
- Performance optimization needed

**When NOT to Use:**
- Props change frequently
- Props are objects/arrays created inline
- Premature optimization (measure first!)

---

### Q34 & Q35: Stateless vs Stateful Components

**Your Answer:**
```
[Write your answer here]
```

**Stateless Components (Presentational):**
```javascript
// Only receives props, no internal state
function UserCard({ name, email, avatar }) {
  return (
    <div className="card">
      <img src={avatar} alt={name} />
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  );
}

// Characteristics:
// - No state
// - Just displays data
// - Pure (props in → UI out)
// - Easy to test
// - Reusable
```

**Stateful Components (Container):**
```javascript
// Has internal state and logic
function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser().then(data => {
      setUser(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <Spinner />;

  // Uses stateless component to display
  return <UserCard {...user} />;
}

// Characteristics:
// - Has state
// - Contains business logic
// - Manages data
// - Orchestrates other components
```

**Best Practice - Container/Presentational Pattern:**
```javascript
// Stateful (container) - handles logic
function TodoApp() {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text }]);
  };

  return <TodoList todos={todos} onAdd={addTodo} />;
}

// Stateless (presentational) - displays UI
function TodoList({ todos, onAdd }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}
```

---

### Q55: Why should component names start with a capital letter?

**Your Answer:**
```
[Write your answer here]
```

**The Rule:**
```javascript
✅ <Welcome />    // Component (capital)
❌ <welcome />    // Treated as HTML element
```

**Why This Matters:**

#### JSX Distinguishes Components from HTML
```javascript
// Component
<Button />
// Compiles to:
React.createElement(Button, null)  // Button is a reference

// HTML element
<button />
// Compiles to:
React.createElement('button', null)  // 'button' is a string
```

**What Happens If You Use Lowercase:**
```javascript
// Wrong:
function button() {
  return <button>Click me</button>;
}

// Usage:
<button />  // React thinks it's HTML <button>, not your component!

// Result: Your component is never used
```

**Correct:**
```javascript
// Right:
function Button() {
  return <button>Click me</button>;
}

// Usage:
<Button />  // React knows it's your component
```

**Exception - Dynamic Components:**
```javascript
// Still needs to start with capital letter in variable
function Page({ componentType }) {
  // Wrong:
  return <componentType />; // React thinks it's HTML

  // Right:
  const Component = componentType;
  return <Component />;
}
```

---

### Q225: Do browsers understand JSX code?

**Your Answer:**
```
[Write your answer here]
```

**Short Answer:**
```
No! Browsers only understand JavaScript.
JSX must be transpiled to JavaScript.
```

**The Process:**

#### 1. You Write JSX:
```jsx
function App() {
  return <h1 className="title">Hello</h1>;
}
```

#### 2. Babel Transpiles to JavaScript:
```javascript
function App() {
  return React.createElement('h1', { className: 'title' }, 'Hello');
}
```

#### 3. Browser Runs JavaScript:
```javascript
// Browser only sees regular JavaScript functions
// No JSX anywhere
```

**Build Pipeline:**
```
Your Code (JSX)
    ↓
Babel (Transpiler)
    ↓
JavaScript (ES5/ES6)
    ↓
Browser (Executes)
```

**Without Build Tools:**
```html
<!-- Would need to include Babel in browser (slow!) -->
<script src="babel.min.js"></script>
<script type="text/babel">
  // JSX here - transpiled in browser
  // ⚠️ Not recommended for production!
</script>
```

**Production Setup:**
```
Build step (Webpack/Vite/Parcel)
  ↓
Babel transforms JSX
  ↓
Bundled JavaScript
  ↓
Browser-ready code
```

---

### Q237 & Q238: New JSX Transform

**Your Answer:**
```
[Write your answer here]
```

**The Change (React 17+):**

#### Old Transform (React 16 and earlier):
```javascript
// Your JSX:
function App() {
  return <h1>Hello</h1>;
}

// Compiled to:
import React from 'react'; // ← Required!

function App() {
  return React.createElement('h1', null, 'Hello');
}
```

**Problems with old transform:**
- ❌ Must import React even if not used
- ❌ React must be in scope
- ❌ Confusing for beginners
- ❌ Larger bundle size

#### New Transform (React 17+):
```javascript
// Your JSX:
function App() {
  return <h1>Hello</h1>;
}

// Compiled to:
import { jsx as _jsx } from 'react/jsx-runtime'; // ← Auto-imported!

function App() {
  return _jsx('h1', { children: 'Hello' });
}
```

**Benefits:**
- ✅ No need to import React
- ✅ Slightly smaller bundles
- ✅ Better performance (minor)
- ✅ Less confusing
- ✅ Future-proof

**Migration:**
```javascript
// Old way (still works):
import React from 'react';
function App() {
  return <h1>Hello</h1>;
}

// New way (preferred):
// No import needed!
function App() {
  return <h1>Hello</h1>;
}

// But you still need React for hooks, etc:
import { useState } from 'react';
function App() {
  const [count, setCount] = useState(0);
  return <h1>{count}</h1>;
}
```

---

### Q248: What are the rules of JSX?

**Your Answer:**
```
[Write your answer here]
```

**The 5 Core Rules:**

#### Rule 1: Return Single Root Element
```javascript
// ❌ Wrong - multiple roots
function Component() {
  return (
    <h1>Title</h1>
    <p>Text</p>
  );
}

// ✅ Right - wrapped in single parent
function Component() {
  return (
    <div>
      <h1>Title</h1>
      <p>Text</p>
    </div>
  );
}

// ✅ Or use Fragment
function Component() {
  return (
    <>
      <h1>Title</h1>
      <p>Text</p>
    </>
  );
}
```

#### Rule 2: Close All Tags
```javascript
// ❌ Wrong
<img src="photo.jpg">
<input type="text">
<br>

// ✅ Right - self-closing
<img src="photo.jpg" />
<input type="text" />
<br />
```

#### Rule 3: Use camelCase for Attributes
```javascript
// ❌ Wrong - HTML attributes
<div class="container" onclick="handleClick()">

// ✅ Right - camelCase
<div className="container" onClick={handleClick}>

// Common conversions:
// class      → className
// for        → htmlFor
// onclick    → onClick
// tabindex   → tabIndex
// stroke-width → strokeWidth
```

#### Rule 4: Use Curly Braces for JavaScript
```javascript
// ❌ Wrong - string instead of variable
<h1>Hello, {name}</h1>

// ✅ Right
<h1>Hello, {name}</h1>

// Can use expressions:
<div>{user.isAdmin ? 'Admin' : 'User'}</div>
<div>{items.map(item => <Item key={item.id} />)}</div>
<div style={{ color: 'red', fontSize: 16 }}</div>
```

#### Rule 5: Return Valid Types
```javascript
// ✅ Valid return types:
return <div>JSX</div>;           // Element
return "Hello";                   // String
return 123;                       // Number
return null;                      // Nothing
return undefined;                 // Nothing
return true/false;                // Nothing
return [<div />, <span />];      // Array of elements

// ❌ Invalid:
return { name: 'John' };         // Object (except elements)
return () => <div />;            // Function
```

---

### Q249: Why must multiple JSX tags be wrapped?

**Your Answer:**
```
[Write your answer here]
```

**The Reason:**

#### JSX is a Function Call
```javascript
// Your JSX:
<div>
  <h1>Title</h1>
  <p>Text</p>
</div>

// Compiles to:
_jsx('div', {
  children: [
    _jsx('h1', { children: 'Title' }),
    _jsx('p', { children: 'Text' })
  ]
})  // ← Single function call returning one object
```

**JavaScript Functions Can't Return Multiple Values:**
```javascript
// ❌ Invalid JavaScript:
function Component() {
  return (
    _jsx('h1', { children: 'Title' })
    _jsx('p', { children: 'Text' })
  );
}
// Syntax error! Can't return two things

// ✅ Valid - return single value:
function Component() {
  return _jsx('div', {
    children: [
      _jsx('h1', { children: 'Title' }),
      _jsx('p', { children: 'Text' })
    ]
  });
}
```

**Solutions:**

#### 1. Wrapper Element:
```jsx
<div>  {/* Parent wrapper */}
  <h1>Title</h1>
  <p>Text</p>
</div>
```

#### 2. Fragment (No DOM node):
```jsx
<>  {/* Doesn't create DOM element */}
  <h1>Title</h1>
  <p>Text</p>
</>

// Or explicit:
<React.Fragment>
  <h1>Title</h1>
  <p>Text</p>
</React.Fragment>
```

#### 3. Array (with keys):
```jsx
[
  <h1 key="title">Title</h1>,
  <p key="text">Text</p>
]
```

---

### Q188: How does JSX prevent injection attacks?

**Your Answer:**
```
[Write your answer here]
```

**JSX is Secure by Default:**

#### Problem - XSS (Cross-Site Scripting):
```javascript
// Dangerous in plain JavaScript:
const userInput = '<img src=x onerror="alert(\'hacked\')">';
element.innerHTML = userInput;  // 💣 Script executes!
```

#### How JSX Protects You:

**1. Everything is Escaped by Default:**
```jsx
const userInput = '<script>alert("hacked")</script>';

// React escapes it:
<div>{userInput}</div>

// Renders as text (safe):
// <div>&lt;script&gt;alert("hacked")&lt;/script&gt;</div>

// NOT as:
// <div><script>alert("hacked")</script></div>  ← Would be dangerous
```

**2. Values are Converted to Strings:**
```jsx
const title = {
  toString() {
    return '<img src=x onerror="alert(\'xss\')">';
  }
};

<h1>{title}</h1>
// Renders: <h1>&lt;img src=x onerror="alert('xss')"&gt;</h1>
// Safe! Displayed as text, not executed
```

**3. Only Way to Inject HTML - dangerouslySetInnerHTML:**
```jsx
// ⚠️ Only way to bypass protection (use carefully!)
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// The name warns you it's dangerous!
// Only use if you:
// - Trust the source
// - Sanitize the HTML first (use DOMPurify)
```

**Safe Pattern with DOMPurify:**
```jsx
import DOMPurify from 'dompurify';

function SafeHTML({ html }) {
  const clean = DOMPurify.sanitize(html);
  return <div dangerouslySetInnerHTML={{ __html: clean }} />;
}
```

**What React Escapes:**
```jsx
const unsafe = {
  script: '<script>alert("xss")</script>',
  image: '<img src=x onerror="alert()">',
  event: 'javascript:alert()',
  style: 'background:url(javascript:alert())'
};

// All safe:
<div>{unsafe.script}</div>   // Shows as text
<div>{unsafe.image}</div>    // Shows as text
<a href={unsafe.event}>Link</a>  // href is sanitized
```

**Bottom Line:**
```
JSX escapes all embedded values by default.
You're safe unless you use dangerouslySetInnerHTML.
If you must use it, sanitize first!
```

---

## 📝 Summary Notes

**JSX in one sentence:**
```
[Your explanation]
```

**Elements vs Components:**
```
[Explain the relationship]
```

**Why function components won over class components:**
```
[Key reasons]
```

---

## ✅ Self-Check

Mark when you can confidently explain:
- [ ] What JSX is and how it compiles
- [ ] Difference between elements and components
- [ ] Three ways to create components
- [ ] When to use class vs function components
- [ ] Pure components and React.memo
- [ ] Stateless vs stateful components
- [ ] Why component names capitalize
- [ ] New JSX transform benefits
- [ ] All JSX rules
- [ ] Why wrapping is required
- [ ] JSX security features

---

## 🎯 Interview Practice Questions

### 1. "Explain JSX compilation and why we needed the new JSX transform"
**Structure:**
- What JSX is
- Old transform (React.createElement)
- Problems
- New transform (jsx-runtime)
- Benefits

**Time:** 3-4 minutes

### 2. "What are the security benefits of JSX?"
**Structure:**
- XSS attack explanation
- How JSX escapes values
- dangerouslySetInnerHTML
- Best practices

**Time:** 2-3 minutes

---

**Study Progress:**
- Started: ___________
- Completed: ___________
- Ready for hands-on: [ ]
