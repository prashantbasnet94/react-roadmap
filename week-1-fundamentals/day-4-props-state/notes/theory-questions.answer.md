# Day 4: Props & State Fundamentals - Theory Questions

**Study Time:** 2 hours
**Date Started:** ___________

---

## 🎯 Questions to Master

### Q9: What is state in React?

**Your Answer:**
```
Component internal data that can change over time.  Owned and managed by components.

When these updates, React re-renders the component. 
State should be treated as immutable, don;t mutate directly instead set the new value using setState
```

**Key Points to Cover:**
- **Definition:** Data that changes over time in a component
- **Mutable:** Can be updated (unlike props)
- **Private:** Owned and managed by the component
- **Triggers re-render:** When state changes, component re-renders
- **Asynchronous:** setState is async

**State Example:**
```javascript
function Counter() {
  const [count, setCount] = useState(0); // State

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

**Characteristics:**
- Lives inside the component
- Changes trigger re-renders
- Should be immutable (don't mutate directly)
- Can be passed to children as props
- Component-specific (each instance has its own)

---

### Q10: What are props in React?

**Your Answer:**
```
Inputs passed by parent to child, like function parameters. 
These are readonly  & unidirectional for receiving components

```

**Key Points to Cover:**
- **Definition:** Arguments passed to components (like function parameters)
- **Immutable:** Cannot be changed by receiving component
- **Unidirectional:** Flow from parent to child
- **Configuration:** Customize component behavior
- **Read-only:** Component cannot modify its own props

**Props Example:**
```javascript
// Parent passes props
function App() {
  return <Welcome name="Sara" age={28} />;
}

// Child receives props
function Welcome(props) {
  return <h1>Hello, {props.name}! You are {props.age}.</h1>;
}

// Or with destructuring
function Welcome({ name, age }) {
  return <h1>Hello, {name}! You are {age}.</h1>;
}
```

**Characteristics:**
- Passed from parent to child
- Read-only in receiving component
- Can be any JavaScript value (strings, numbers, objects, functions, elements)
- Used for component configuration
- Trigger re-render when changed (by parent)

---

### Q11: What is the difference between state and props?

**Your Answer:**
```

Props are read only inputs components receives, whereas states are multable data owned by compoents. 
```

**Comparison Table:**

| Feature | Props | State |
|---------|-------|-------|
| **Source** | Passed from parent | Defined in component |
| **Mutability** | Immutable (read-only) | Mutable (via setState) |
| **Ownership** | Parent owns | Component owns |
| **Can change?** | No (by component) | Yes (by component) |
| **Triggers re-render?** | Yes (when parent changes it) | Yes (when updated) |
| **Used for** | Configuration, data passing | Dynamic, changing data |
| **Access** | `props.name` or `{name}` | `state.count` or `[count]` |

**Simple Mental Model:**
```
Props = Function parameters (received from outside)
State = Local variables (created inside)
```

**Example Showing Both:**
```javascript
// Parent component
function App() {
  const [theme, setTheme] = useState('dark'); // State

  return <Button theme={theme} />; // Passed as prop
}

// Child component
function Button({ theme }) { // Prop from parent
  const [clicked, setClicked] = useState(false); // Own state

  return (
    <button
      className={theme} // Using prop
      onClick={() => setClicked(true)} // Updating state
    >
      {clicked ? 'Clicked!' : 'Click me'}
    </button>
  );
}
```

**Key Insight:**
```
Props flow down (parent → child)
State lives in component
A component's state can become a child's props
```

---

### Q67: Why can't you update props in React?

**Your Answer:**
```
Props are read only, allowing children to mutate props break one way data flow and make ownership unclear.
If needed children should ask the parent to update the value using callback prop.

```

**Short Answer:**
```
Props are read-only to maintain unidirectional data flow
and make components predictable.
```

**Reasons:**

#### 1. **Unidirectional Data Flow**
```javascript
// Parent owns the data
function Parent() {
  const [name, setName] = useState('John');
  return <Child name={name} />;
}

// Child only displays it
function Child({ name }) {
  // ❌ Can't do this:
  // name = 'Jane';  // Error! Props are read-only

  // ✅ Must ask parent to change it:
  return <div>{name}</div>;
}
```

#### 2. **Single Source of Truth**
```javascript
// If child could change props, we'd have confusion:
// Parent thinks name is "John"
// Child changed it to "Jane"
// Who is right? Chaos!

// With read-only props:
// Parent always knows the current value
// Clear ownership
```

#### 3. **Predictability**
```javascript
// Same props = same output (pure function)
function Welcome({ name }) {
  return <h1>Hello, {name}</h1>;
}

<Welcome name="Sara" /> // Always shows "Sara"
<Welcome name="Sara" /> // Always shows "Sara"
// Predictable! Props don't change unexpectedly
```

**Correct Pattern - Lift State Up:**
```javascript
function Parent() {
  const [name, setName] = useState('John');

  return (
    <Child
      name={name}
      onNameChange={setName} // Pass setter function
    />
  );
}

function Child({ name, onNameChange }) {
  return (
    <div>
      <p>{name}</p>
      <button onClick={() => onNameChange('Jane')}>
        Change Name
      </button>
    </div>
  );
}
```

---

### Q190: How do you indicate that props are read-only?

**Your Answer:**
```

In react props are conceptually read only by design. 
In ts you can enforce them by ReadOnly<>, 
we can also use PropTypes of runtime type validation though it does not enforece immutablitiy.

```

**TypeScript Way (Best for Large Apps):**
```typescript
// Readonly utility type
type Props = Readonly<{
  name: string;
  age: number;
}>;

function User(props: Props) {
  // props.name = 'Jane'; // TS Error: Cannot assign to 'name'
  return <div>{props.name}</div>;
}

// Or inline:
function User(props: Readonly<{ name: string }>) {
  return <div>{props.name}</div>;
}
```

**PropTypes Way (Runtime Validation):**
```javascript
import PropTypes from 'prop-types';

function User({ name, age }) {
  return <div>{name} - {age}</div>;
}

// Validates props at runtime
User.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired
};

// Note: PropTypes don't enforce read-only,
// but validate correct types
```

**Convention:**
```javascript
// In practice, props are read-only by convention
// React doesn't freeze props object, but you shouldn't mutate

function Component(props) {
  // ❌ Don't do this (though it technically works)
  props.name = 'new';

  // ✅ Treat as read-only
  const name = props.name;
}
```

**Object.freeze (Strict Mode):**
```javascript
// React freezes props in strict mode (development)
<StrictMode>
  <App />
</StrictMode>

// Attempting to modify props throws error in dev
```

---

### Q36: How to apply validation to props in React?

**Your Answer:**
```
1. PropTypes => runTime validation in dev
2. Typescript compile time validdtaion for props readonly
```

**Method 1: PropTypes (Runtime Validation)**

```javascript
import PropTypes from 'prop-types';

function User({ name, age, email, onSave }) {
  return <div>{name}</div>;
}

// Define prop types
User.propTypes = {
  // Primitive types
  name: PropTypes.string.isRequired,
  age: PropTypes.number,
  email: PropTypes.string,
  onSave: PropTypes.func.isRequired,

  // Complex types
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }),

  // Arrays
  tags: PropTypes.arrayOf(PropTypes.string),

  // Objects with specific shape
  config: PropTypes.objectOf(PropTypes.number),

  // One of specific values
  status: PropTypes.oneOf(['pending', 'approved', 'rejected']),

  // One of types
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),

  // Custom validator
  customProp: function(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(
        `Invalid prop \`${propName}\` in \`${componentName}\``
      );
    }
  }
};

// Default props
User.defaultProps = {
  age: 18,
  email: 'no-email@example.com'
};
```

**Method 2: TypeScript (Compile-Time Validation)**

```typescript
interface UserProps {
  name: string;
  age?: number; // Optional
  email: string;
  onSave: (user: User) => void;
  status: 'pending' | 'approved' | 'rejected'; // Union type
}

function User({ name, age = 18, email, onSave, status }: UserProps) {
  return <div>{name}</div>;
}

// TypeScript catches errors at compile time
<User name="John" age="28" /> // Error: age should be number, not string
```

**Comparison:**

| PropTypes | TypeScript |
|-----------|-----------|
| Runtime validation | Compile-time validation |
| Development only | Always checked |
| Smaller bundle (removed in prod) | Type checking, then removed |
| Easier to add to existing project | Requires TS setup |
| Warnings in console | Build errors |

---

### Q178: What are default props?

**Your Answer:**
```
Fallback values used when parent does not provie a prop.
```

**Definition:**
```
Default values for props when not provided by parent
```

**Function Components (Modern Way):**
```javascript
// Method 1: Default parameters (Recommended)
function Welcome({ name = 'Guest', age = 0 }) {
  return <h1>Hello, {name}! Age: {age}</h1>;
}

// Usage:
<Welcome name="John" />        // Hello, John! Age: 0
<Welcome name="Jane" age={25} /> // Hello, Jane! Age: 25
<Welcome />                     // Hello, Guest! Age: 0
```

**Function Components (Old Way):**
```javascript
function Welcome({ name, age }) {
  return <h1>Hello, {name}! Age: {age}</h1>;
}

// Set defaultProps
Welcome.defaultProps = {
  name: 'Guest',
  age: 0
};
```

**With TypeScript:**
```typescript
interface Props {
  name?: string; // Optional
  age?: number;
}

function Welcome({ name = 'Guest', age = 0 }: Props) {
  return <h1>Hello, {name}! Age: {age}</h1>;
}
```

---

### Q184: When do component props default to true?

**Your Answer:**
```
if you pass a props without a value, it is set to true by defualt.
```

**The Rule:**
```
If you pass a prop without a value, it defaults to true
```

**Examples:**
```jsx
// These are equivalent:
<Button disabled />
<Button disabled={true} />

// Both mean:
<Button disabled={true} />
```

**More Examples:**
```jsx
<input required />           // required={true}
<input readOnly />           // readOnly={true}
<MyComponent isActive />     // isActive={true}
<MyComponent showHeader />   // showHeader={true}
```

**Why This Exists:**
```
Mirrors HTML behavior:
<input disabled>  <!-- Same as disabled="true" -->
```

**⚠️ Not Recommended:**
```javascript
// Confusing:
<MyComponent active />

// Better - explicit:
<MyComponent active={true} />

// Or for false:
<MyComponent active={false} />
```

**When It's Useful:**
```jsx
// Boolean flags are clear:
<Modal
  open
  centered
  closable
/>

// vs verbose:
<Modal
  open={true}
  centered={true}
  closable={true}
/>
```

**Gotcha:**
```jsx
// This is NOT the same as false!
<Component /> // prop is undefined

// This is false:
<Component flag={false} />

// This is true:
<Component flag />
```

---

### OQ1: Why should we not update the state directly?

**Your Answer:**
```
Directly mutating the state breaks React's change detection and also prevent re-render as data reference might not have changed.

```

**Short Answer:**
```
Direct mutation doesn't trigger re-renders
and breaks React's change detection.
```

**The Problem:**
```javascript
// ❌ Wrong - Direct mutation
count = count + 1;                         // Hook (doesn't work!)

// Why it's bad:
// 1. Doesn't trigger re-render
// 2. React doesn't know state changed
// 3. UI won't update
// 4. Breaks time-travel debugging
```

**Correct Way:**
```javascript
// ✅ Function component with hooks
setCount(count + 1);
// Or with updater function:
setCount(prevCount => prevCount + 1);
```

**Why Immutability Matters:**
```javascript
// React uses shallow comparison:
const oldState = { count: 1 };
const newState = oldState;
newState.count = 2;

oldState === newState  // true! Same reference
// React thinks nothing changed!

// Correct - create new object:
const newState = { ...oldState, count: 2 };
oldState === newState  // false! Different reference
// React detects change!
```

**Real Example:**
```javascript
// ❌ Wrong - mutates array
const [items, setItems] = useState([1, 2, 3]);
items.push(4);          // Mutates directly
setItems(items);        // Same reference, no re-render!

// ✅ Right - create new array
setItems([...items, 4]); // New array, triggers re-render
setItems(items.concat(4)); // Also works
```

---

### OQ2: What is the purpose of callback function as an argument of setState()?

**Your Answer:**
```

if current state depends on previous state, we should pass an update function so the react uses latest value.

```

**Purpose:**
```
Ensures you use the latest state value
when updating based on previous state.
```

**The Problem:**
```javascript
// ❌ Wrong - can cause bugs
const [count, setCount] = useState(0);

function increment() {
  setCount(count + 1); // Uses stale closure value
  setCount(count + 1); // Still uses same stale value
  setCount(count + 1); // count is still 0!
}

increment(); // Result: count = 1 (not 3!)
```

**The Solution:**
```javascript
// ✅ Right - uses updater function
function increment() {
  setCount(c => c + 1); // c is always latest
  setCount(c => c + 1); // c is updated from previous
  setCount(c => c + 1); // c is updated again
}

increment(); // Result: count = 3 ✅
```

**How It Works:**
```javascript
// React queues updates:
setCount(c => c + 1);  // c = 0, returns 1
setCount(c => c + 1);  // c = 1, returns 2
setCount(c => c + 1);  // c = 2, returns 3
// Final state: 3
```

---

### OQ15: How to set state with a dynamic key name?

**Your Answer:**
```
 
 setState({
  ...state,
  [key]: value
 })
```

**Computed Property Names:**

```javascript
function Form() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  // ✅ Dynamic key using computed property
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value  // ← Computed property name
    });
  }

  return (
    <form>
      <input
        name="username"
        value={formData.username}
        onChange={handleChange}
      />
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
    </form>
  );
}
```

**How It Works:**
```javascript
const fieldName = 'username';
const value = 'john';

// These are equivalent:
setFormData({ ...formData, [fieldName]: value });
setFormData({ ...formData, username: value });

// The brackets [] evaluate the expression
```

**Class Component Version:**
```javascript
handleChange = (event) => {
  const { name, value } = event.target;

  this.setState({
    [name]: value
  });
}
```

**Multiple Dynamic Keys:**
```javascript
function updateMultiple(updates) {
  // updates = { username: 'john', email: 'john@example.com' }

  setFormData(prev => ({
    ...prev,
    ...updates  // Spread multiple dynamic keys
  }));
}

// Or manually:
setFormData(prev => ({
  ...prev,
  [key1]: value1,
  [key2]: value2
}));
```


### OQ31: Why we need to pass a function to setState()?

**Your Answer:**
```

state update are aync & batched, passing a function ensures the updates uses latest state vlaue instead of a stale one.

if the current state depends on prev state always pass a updater function 
```

**Already covered in OQ2, but here's a summary:**

**Reason 1: Batching**
```javascript
// React batches setState calls
function handleClick() {
  setCount(count + 1);  // Queued
  setCount(count + 1);  // Queued
  setCount(count + 1);  // Queued
  // All use same 'count' value from closure!
}

// With function:
function handleClick() {
  setCount(c => c + 1);  // Uses latest
  setCount(c => c + 1);  // Uses latest
  setCount(c => c + 1);  // Uses latest
}
```

**Reason 2: Async Updates**
```javascript
setCount(count + 1);
console.log(count); // Still old value! setState is async
```

**Reason 3: Guarantees Latest State**
```javascript
// The updater function receives the latest state
// Even if multiple updates are queued
setCount(prevCount => {
  // prevCount is guaranteed to be latest
  return prevCount + 1;
});
```

---


### OQ72: How do you say that state updates are merged?

**Your Answer:**
```
Only on class comppments states updates are mereged automocatilly, using react hooks, state updates  need to be merged manually.

```

**Hooks - No Automatic Merging:**
```javascript
function MyComponent() {
  const [state, setState] = useState({
    name: 'John',
    age: 30,
    email: 'john@example.com'
  });

  // ❌ Wrong - overwrites entire state
  setState({ name: 'Jane' });
  // Result: { name: 'Jane' }
  // age and email are GONE!

  // ✅ Right - manual merge
  setState({ ...state, name: 'Jane' });
  // Result: { name: 'Jane', age: 30, email: 'john@example.com' }
}
```


**Best Practice with Hooks - Separate State:**
```javascript
// Instead of one big object:
const [state, setState] = useState({ name: '', age: 0, email: '' });

// Use separate states:
const [name, setName] = useState('');
const [age, setAge] = useState(0);
const [email, setEmail] = useState('');

// Much simpler!
setName('Jane'); // Only updates name
```

---

## 📝 Summary Notes

**State vs Props in one sentence each:**
```
State: [Your definition]
Props: [Your definition]
```

**Why immutability matters:**
```
[Your explanation]
```

**When to use updater functions:**
```
[Your rule of thumb]
```

---

## ✅ Self-Check

Mark when you can confidently explain:
- [ ] What state is and how it works
- [ ] What props are and their characteristics
- [ ] Key differences between state and props
- [ ] Why props are read-only
- [ ] How to validate props (PropTypes & TypeScript)
- [ ] Default props patterns
- [ ] When props default to true
- [ ] Why not to mutate state directly
- [ ] When to use setState updater functions
- [ ] super(props) purpose
- [ ] Dynamic property names in setState
- [ ] Props in initial state antipattern
- [ ] State merging behavior (class vs hooks)

---

## 🎯 Interview Practice Questions

### 1. "Explain the difference between state and props with real examples"
**Time:** 3-4 minutes

### 2. "Why is immutability important in React?"
**Time:** 2-3 minutes

### 3. "Walk me through how you would create a form with validation"
**Time:** 4-5 minutes

---

**Study Progress:**
- Started: ___________
- Completed: ___________
- Ready for hands-on: [ ]
