# Day 5: State Management & Updates - Theory Questions

**Study Time:** 2 hours
**Date Started:** ___________

---

## 🎯 Questions to Master

### Q21 & Q22: Controlled vs Uncontrolled Components

**Your Answer:**
```
[Write your answer here]
```

**Controlled Components:**
```javascript
// React controls the value
function ControlledInput() {
  const [value, setValue] = useState('');

  return (
    <input
      value={value}                    // React controls value
      onChange={e => setValue(e.target.value)} // Update on change
    />
  );
}

// Characteristics:
// - Value stored in React state
// - Single source of truth (React state)
// - onChange handler required
// - Can validate on every keystroke
```

**Uncontrolled Components:**
```javascript
// DOM controls the value
function UncontrolledInput() {
  const inputRef = useRef();

  function handleSubmit() {
    console.log(inputRef.current.value); // Read from DOM
  }

  return (
    <input
      ref={inputRef}               // Access via ref
      defaultValue="initial"       // Initial value only
    />
  );
}

// Characteristics:
// - Value stored in DOM
// - Use refs to access value
// - defaultValue for initial value
// - Reads value when needed (e.g., on submit)
```

**Comparison Table:**

| Feature | Controlled | Uncontrolled |
|---------|-----------|--------------|
| **Value source** | React state | DOM |
| **Access** | state variable | ref.current.value |
| **Updates** | onChange handler | Browser handles |
| **Validation** | Real-time | On submit |
| **Initial value** | value prop | defaultValue prop |
| **Control** | Full React control | Browser control |

**When to Use Each:**

```javascript
// ✅ Use Controlled for:
// - Form validation
// - Conditional enabling/disabling
// - Enforcing formats
// - Real-time search
<input
  value={email}
  onChange={e => setEmail(e.target.value)}
  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
/>

// ✅ Use Uncontrolled for:
// - Simple forms
// - File inputs (must be uncontrolled)
// - Integration with non-React code
<input type="file" ref={fileRef} />
```

---

### Q256: How to update objects inside state?

**Your Answer:**
```
[Write your answer here]
```

**The Rule: Create New Objects (Don't Mutate)**

```javascript
const [user, setUser] = useState({
  name: 'John',
  age: 30,
  address: {
    city: 'NYC',
    zip: '10001'
  }
});

// ❌ Wrong - mutates object
user.name = 'Jane';
setUser(user); // Same reference, no re-render!

// ✅ Right - create new object
setUser({
  ...user,
  name: 'Jane'
});

// ✅ Update multiple properties
setUser({
  ...user,
  name: 'Jane',
  age: 31
});
```

**Pattern 1: Spread Operator**
```javascript
// Update single property
setUser({ ...user, name: 'Jane' });

// Update with computed property
const field = 'age';
setUser({ ...user, [field]: 31 });

// Conditional update
setUser({
  ...user,
  ...(isAdmin && { role: 'admin' })
});
```

**Pattern 2: Updater Function**
```javascript
// When new state depends on previous
setUser(prevUser => ({
  ...prevUser,
  age: prevUser.age + 1
}));

// Multiple updates in sequence
setUser(prev => ({ ...prev, name: 'Jane' }));
setUser(prev => ({ ...prev, age: prev.age + 1 }));
```

**Common Pitfall:**
```javascript
// ❌ This doesn't work (shallow spread only)
const [user, setUser] = useState({
  name: 'John',
  address: { city: 'NYC', zip: '10001' }
});

setUser({
  ...user,
  address: { city: 'LA' } // ⚠️ Loses zip!
});

// Result: { name: 'John', address: { city: 'LA' } }
// zip is gone!
```

---

### Q257: How to update nested objects inside state?

**Your Answer:**
```
[Write your answer here]
```

**Problem: Spread is Shallow**

```javascript
const [user, setUser] = useState({
  name: 'John',
  contact: {
    email: 'john@example.com',
    phone: '123-456-7890',
    address: {
      city: 'NYC',
      zip: '10001'
    }
  }
});

// ❌ Wrong - only spreads top level
setUser({
  ...user,
  contact: {
    address: {
      city: 'LA' // Lost email, phone, and zip!
    }
  }
});
```

**Solution 1: Nested Spreads**

```javascript
// ✅ Update nested property
setUser({
  ...user,
  contact: {
    ...user.contact,
    email: 'jane@example.com'
  }
});

// ✅ Update deeply nested
setUser({
  ...user,
  contact: {
    ...user.contact,
    address: {
      ...user.contact.address,
      city: 'LA'
    }
  }
});
```

**Solution 2: Immer Library (Recommended for Complex State)**

```javascript
import { useImmer } from 'use-immer';

const [user, updateUser] = useImmer({
  name: 'John',
  contact: {
    email: 'john@example.com',
    address: {
      city: 'NYC',
      zip: '10001'
    }
  }
});

// ✅ Update as if mutable (Immer handles immutability)
updateUser(draft => {
  draft.contact.address.city = 'LA';
  draft.name = 'Jane';
});

// Much simpler for deep updates!
```

**Pattern: Flatten State When Possible**

```javascript
// ❌ Nested - harder to update
const [state, setState] = useState({
  user: {
    profile: {
      settings: {
        theme: 'dark'
      }
    }
  }
});

// ✅ Flat - easier to update
const [theme, setTheme] = useState('dark');
const [userName, setUserName] = useState('John');
const [userEmail, setUserEmail] = useState('john@example.com');
```

---

### Q258: How to update arrays inside state?

**Your Answer:**
```
[Write your answer here]
```

**The Rule: Create New Arrays (Don't Mutate)**

**Add to Array:**
```javascript
const [items, setItems] = useState([1, 2, 3]);

// ❌ Wrong - mutates array
items.push(4);
setItems(items); // Same reference!

// ✅ Right - create new array
setItems([...items, 4]);        // Add to end
setItems([4, ...items]);        // Add to start
setItems([...items, 4, 5, 6]);  // Add multiple
```

**Remove from Array:**
```javascript
// ✅ Remove by index
setItems(items.filter((_, index) => index !== indexToRemove));

// ✅ Remove by value
setItems(items.filter(item => item !== valueToRemove));

// ✅ Remove by id
setItems(items.filter(item => item.id !== idToRemove));
```

**Update in Array:**
```javascript
// ✅ Update by index
setItems(items.map((item, index) =>
  index === indexToUpdate ? newValue : item
));

// ✅ Update by id
setItems(items.map(item =>
  item.id === idToUpdate
    ? { ...item, completed: true }
    : item
));

// ✅ Update multiple properties
setItems(items.map(item =>
  item.id === id
    ? { ...item, name: 'New', status: 'active' }
    : item
));
```

**Insert into Array:**
```javascript
// ✅ Insert at specific position
const insertAt = (arr, index, item) => [
  ...arr.slice(0, index),
  item,
  ...arr.slice(index)
];

setItems(insertAt(items, 2, newItem));
```

**Replace Array:**
```javascript
// ✅ Replace entire array
setItems([4, 5, 6]);
setItems([]);  // Clear array
```

**Complex Example - Todo List:**
```javascript
const [todos, setTodos] = useState([
  { id: 1, text: 'Learn React', completed: false },
  { id: 2, text: 'Build app', completed: false }
]);

// Add todo
const addTodo = (text) => {
  setTodos([...todos, {
    id: Date.now(),
    text,
    completed: false
  }]);
};

// Toggle todo
const toggleTodo = (id) => {
  setTodos(todos.map(todo =>
    todo.id === id
      ? { ...todo, completed: !todo.completed }
      : todo
  ));
};

// Delete todo
const deleteTodo = (id) => {
  setTodos(todos.filter(todo => todo.id !== id));
};
```

---

### Q259: How to use Immer library for state updates?

**Your Answer:**
```
[Write your answer here]
```

**What is Immer?**
```
Library that lets you write "mutating" code
that produces immutable updates behind the scenes.
```

**Installation:**
```bash
npm install immer
# or for React hooks version:
npm install use-immer
```

**Basic Usage with Immer:**

```javascript
import { produce } from 'immer';

const [state, setState] = useState({
  user: { name: 'John', age: 30 },
  todos: [{ id: 1, text: 'Learn React' }]
});

// Update with Immer
setState(produce(state, draft => {
  draft.user.age = 31;  // "Mutate" directly
  draft.todos.push({ id: 2, text: 'Build app' });
}));
```

**With React Hook (Recommended):**

```javascript
import { useImmer } from 'use-immer';

function TodoApp() {
  const [todos, updateTodos] = useImmer([
    { id: 1, text: 'Learn React', done: false }
  ]);

  // ✅ Write like you're mutating (Immer makes it immutable)
  const addTodo = (text) => {
    updateTodos(draft => {
      draft.push({
        id: Date.now(),
        text,
        done: false
      });
    });
  };

  const toggleTodo = (id) => {
    updateTodos(draft => {
      const todo = draft.find(t => t.id === id);
      if (todo) {
        todo.done = !todo.done;  // Direct mutation!
      }
    });
  };

  const deleteTodo = (id) => {
    updateTodos(draft => {
      const index = draft.findIndex(t => t.id === id);
      if (index !== -1) {
        draft.splice(index, 1);  // Array mutation!
      }
    });
  };
}
```

**Complex Nested Updates:**

```javascript
// Without Immer - verbose
setUser({
  ...user,
  profile: {
    ...user.profile,
    settings: {
      ...user.profile.settings,
      notifications: {
        ...user.profile.settings.notifications,
        email: true
      }
    }
  }
});

// With Immer - simple
updateUser(draft => {
  draft.profile.settings.notifications.email = true;
});
```

**When to Use Immer:**
- Deep nested state updates
- Complex array operations
- Many related updates
- Team prefers mutable-style code

**When NOT to Use Immer:**
- Simple, flat state
- Small apps
- Learning React (learn immutability first!)
- Bundle size concerns

---

### Q260 & Q261: Benefits of Immutability & Preferred Array Operations

**Your Answer:**
```
[Write your answer here]
```

**Q260: Benefits of Preventing Direct State Mutations**

**1. React Can Detect Changes:**
```javascript
// Mutation - React can't detect
const oldArray = [1, 2, 3];
oldArray.push(4);
oldArray === oldArray  // true (same reference)
// React: "Nothing changed!"

// Immutable - React detects
const newArray = [...oldArray, 4];
oldArray === newArray  // false (different reference)
// React: "Update detected!"
```

**2. Time-Travel Debugging:**
```javascript
// Redux DevTools can go back in time
// because each state is a snapshot

// Mutation breaks this:
history = [state]; // state = { count: 0 }
state.count = 1;   // Mutates!
// history[0].count is also 1 now! Can't go back!

// Immutability preserves history:
history = [{ count: 0 }];
newState = { count: 1 };
history.push(newState);
// history[0].count is still 0! Can go back!
```

**3. Predictable Updates:**
```javascript
// With mutation - unpredictable
const user = { name: 'John' };
updateUser(user);  // What changed? Who knows!

// With immutability - clear
const newUser = { ...user, name: 'Jane' };
// Clear: only name changed
```

**4. Performance Optimizations:**
```javascript
// React.memo can do shallow comparison
const MyComponent = React.memo(({ data }) => {
  // Only re-renders if data reference changes
  return <div>{data.value}</div>;
});

// With mutation:
data.value = 'new';
setData(data);  // Same reference, memo doesn't detect!

// With immutability:
setData({ ...data, value: 'new' });  // New reference, memo works!
```

**Q261: Preferred Array Operations for Updating State**

**✅ Safe Operations (Return New Array):**
```javascript
// Add
[...arr, item]          // Push
[item, ...arr]          // Unshift
arr.concat(item)        // Append

// Remove/Filter
arr.filter(x => x !== value)
arr.slice(0, index).concat(arr.slice(index + 1))

// Transform
arr.map(x => x * 2)

// Sort
[...arr].sort()         // Clone first!
```

**❌ Unsafe Operations (Mutate Array):**
```javascript
// Don't use directly on state:
arr.push(item)          // ❌ Mutates
arr.pop()               // ❌ Mutates
arr.shift()             // ❌ Mutates
arr.unshift(item)       // ❌ Mutates
arr.splice(index, 1)    // ❌ Mutates
arr.sort()              // ❌ Mutates
arr.reverse()           // ❌ Mutates
arr[index] = value      // ❌ Mutates

// Use them like this instead:
setArr([...arr, item])                    // Instead of push
setArr(arr.slice(0, -1))                  // Instead of pop
setArr(arr.slice(1))                      // Instead of shift
setArr([item, ...arr])                    // Instead of unshift
setArr([...arr].sort())                   // Instead of sort
```

---

### Q250: How to prevent mutating array variables?

**Your Answer:**
```
[Write your answer here]
```

**Technique 1: Use Immutable Methods**
```javascript
const [items, setItems] = useState([1, 2, 3]);

// ✅ Always create new array
setItems([...items, 4]);
setItems(items.filter(x => x > 1));
setItems(items.map(x => x * 2));
```

**Technique 2: Object.freeze (Development)**
```javascript
// Freeze array in development to catch mutations
const arr = Object.freeze([1, 2, 3]);
arr.push(4);  // Error in strict mode!
arr[0] = 10;  // Error in strict mode!
```

**Technique 3: ESLint Rules**
```javascript
// .eslintrc.js
{
  "plugins": ["immutable"],
  "rules": {
    "immutable/no-mutation": "error"
  }
}

// Catches mutations at lint time
const arr = [1, 2, 3];
arr.push(4);  // ESLint error!
```

**Technique 4: TypeScript Readonly**
```typescript
// Make arrays readonly
const items: readonly number[] = [1, 2, 3];
items.push(4);  // TypeScript error!
items[0] = 10;  // TypeScript error!

// Or with ReadonlyArray
const items: ReadonlyArray<number> = [1, 2, 3];
```

**Technique 5: Immer (For Complex Cases)**
```javascript
import { useImmer } from 'use-immer';

const [items, updateItems] = useImmer([1, 2, 3]);

updateItems(draft => {
  draft.push(4);  // Looks like mutation, but Immer makes it immutable!
});
```

---

### Q166: How to prevent unnecessary updates using setState?

**Your Answer:**
```
[Write your answer here]
```

**Problem: Unnecessary Re-renders**

```javascript
// Every setState triggers re-render
const [count, setCount] = useState(0);

// Even if value doesn't change!
setCount(0);  // count was already 0, but still re-renders
```

**Solution 1: Conditional Updates**
```javascript
const handleUpdate = (newValue) => {
  // Only update if actually different
  if (newValue !== count) {
    setCount(newValue);
  }
};
```

**Solution 2: React's Built-in Check**
```javascript
// React bails out if value is the same (Object.is comparison)
setCount(0);  // count is 0
setCount(0);  // React skips re-render! ✅

// BUT only works for primitives:
setState({ count: 0 });  // count is { count: 0 }
setState({ count: 0 });  // Different object, re-renders! ⚠️
```

**Solution 3: useMemo for Expensive Computations**
```javascript
const ExpensiveComponent = ({ items }) => {
  // Only recalculate when items change
  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price, 0);
  }, [items]);

  return <div>Total: {total}</div>;
};
```

**Solution 4: React.memo for Components**
```javascript
// Only re-render if props change
const ChildComponent = React.memo(({ value }) => {
  return <div>{value}</div>;
});

function Parent() {
  const [count, setCount] = useState(0);
  const [unrelated, setUnrelated] = useState('');

  return (
    <>
      <ChildComponent value={count} />
      {/* Child doesn't re-render when unrelated changes */}
      <input onChange={e => setUnrelated(e.target.value)} />
    </>
  );
}
```

**Solution 5: useCallback for Function Props**
```javascript
function Parent() {
  const [count, setCount] = useState(0);

  // ❌ New function every render
  const handleClick = () => setCount(c => c + 1);

  // ✅ Same function reference
  const handleClick = useCallback(() => {
    setCount(c => c + 1);
  }, []);

  return <Child onClick={handleClick} />;
}
```

---

### Q24: What is Lifting State Up in React?

**Your Answer:**
```
[Write your answer here]
```

**Definition:**
```
Moving state from child component to parent component
so multiple children can share it.
```

**The Problem:**
```javascript
// Two siblings need to share data
function Parent() {
  return (
    <>
      <SiblingA />  {/* Has temperature state */}
      <SiblingB />  {/* Needs same temperature */}
    </>
  );
}

// How do they share? They can't!
```

**The Solution - Lift State Up:**
```javascript
// Move state to common parent
function Parent() {
  const [temperature, setTemperature] = useState(0);

  return (
    <>
      <SiblingA
        temperature={temperature}
        onChange={setTemperature}
      />
      <SiblingB temperature={temperature} />
    </>
  );
}

function SiblingA({ temperature, onChange }) {
  return (
    <input
      value={temperature}
      onChange={e => onChange(e.target.value)}
    />
  );
}

function SiblingB({ temperature }) {
  return <div>Temperature: {temperature}</div>;
}
```

**Real Example - Temperature Calculator:**
```javascript
function TemperatureCalculator() {
  const [temperature, setTemperature] = useState('');
  const [scale, setScale] = useState('c');

  const celsius = scale === 'f'
    ? (temperature - 32) * 5/9
    : temperature;

  const fahrenheit = scale === 'c'
    ? (temperature * 9/5) + 32
    : temperature;

  return (
    <div>
      <TemperatureInput
        scale="c"
        temperature={celsius}
        onTemperatureChange={temp => {
          setTemperature(temp);
          setScale('c');
        }}
      />
      <TemperatureInput
        scale="f"
        temperature={fahrenheit}
        onTemperatureChange={temp => {
          setTemperature(temp);
          setScale('f');
        }}
      />
      <BoilingVerdict celsius={celsius} />
    </div>
  );
}
```

**When to Lift State:**
- Multiple components need same data
- Components need to stay in sync
- Sibling components need to communicate
- Parent needs to coordinate children

**Trade-offs:**
- ✅ Single source of truth
- ✅ Easier to debug
- ✅ Siblings can share data
- ❌ More props to pass
- ❌ Parent becomes complex

---

### OQ37-OQ40: Miscellaneous State Questions

**OQ37: How to listen to state changes?**

```javascript
// Use useEffect
function Component() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Count changed to:', count);
    // Run side effect when count changes
  }, [count]);

  return <div>{count}</div>;
}
```

**OQ38: Recommended approach of removing array element in state?**

```javascript
// ✅ filter by id (most common)
setItems(items.filter(item => item.id !== idToRemove));

// ✅ filter by index
setItems(items.filter((_, index) => index !== indexToRemove));

// ✅ filter by condition
setItems(items.filter(item => item.completed === false));
```

**OQ40: Approaches to updating objects in state?**

```javascript
// 1. Spread operator
setUser({ ...user, name: 'Jane' });

// 2. Object.assign
setUser(Object.assign({}, user, { name: 'Jane' }));

// 3. Updater function
setUser(prev => ({ ...prev, name: 'Jane' }));

// 4. Immer
updateUser(draft => { draft.name = 'Jane'; });
```

**OQ89: What is state mutation and how to prevent it?**

```javascript
// Mutation
const user = { name: 'John' };
user.name = 'Jane';  // ❌ Mutates object

// Prevention
const user = { name: 'John' };
const newUser = { ...user, name: 'Jane' };  // ✅ New object
```

---

## 📝 Summary Notes

**Controlled vs Uncontrolled:**
```
[When to use each]
```

**Immutability in one sentence:**
```
[Your explanation]
```

**Lifting state up pattern:**
```
[When and how]
```

---

## ✅ Self-Check

- [ ] Understand controlled vs uncontrolled components
- [ ] Can update objects immutably
- [ ] Can update nested objects
- [ ] Can update arrays (add, remove, update)
- [ ] Know when to use Immer
- [ ] Understand benefits of immutability
- [ ] Know safe vs unsafe array operations
- [ ] Can prevent array mutations
- [ ] Can prevent unnecessary updates
- [ ] Understand lifting state up pattern

---

## 🎯 Interview Practice Questions

### 1. "Show me how to update nested state immutably"
**Time:** 3-4 minutes

### 2. "When would you use controlled vs uncontrolled components?"
**Time:** 2-3 minutes

### 3. "Explain lifting state up with a real example"
**Time:** 3-4 minutes

---

**Study Progress:**
- Started: ___________
- Completed: ___________
- Ready for hands-on: [ ]
