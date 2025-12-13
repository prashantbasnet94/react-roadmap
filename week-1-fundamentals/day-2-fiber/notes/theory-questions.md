# Day 2: React Fiber Architecture - Theory Questions

**Study Time:** 2 hours
**Date Started:** ___________

---

## 🎯 Questions to Master

### Q19: What is React Fiber?

**Your Answer:**
```

Fundamental architeture of react that transitioned from sync, block rendering model to aync, interuptible rendering to alllow priorize updates.


For example ensuring critical task like user input are handled immdediately.

Before fiber, a large rendering would monopolize & block the main thread until the task is completed leading to freezing or lag.

Fiber's async & interruptible design allows React to pause it's work & let the main thread handle urgert things & resume the work letter
thus avoid blocking.

```

**Key Points to Cover:**
- **Definition:** Complete rewrite of React's reconciliation algorithm (React 16+)
- **Purpose:** Enable incremental rendering
- **What it is:** A data structure representing a unit of work
- **Goal:** Make rendering interruptible and prioritizable
- **Result:** Smoother UI, better perceived performance

**Fiber is:**
```
A "fiber" = A JavaScript object representing:
  - A component instance
  - Its current state
  - Its work to be done
  - Its relationship to other fibers
```

**The Problem Fiber Solved:**
```
Before Fiber (React 15):
  - Rendering was synchronous and blocking
  - Long updates froze the UI
  - No way to pause/resume work
  - No prioritization of updates
```

**After Fiber (React 16+):**
```
✅ Rendering can be paused and resumed
✅ Work can be split into chunks
✅ Updates can be prioritized
✅ Smooth animations even during heavy updates
```

---

### Q20: What is the main goal of React Fiber?

**Your Answer:**
```
As our body is made out of billions of fiber these fiber makes our body resilent and flexible.
Similarly, the fiber in react are doing the same thing in software side.
They break down the bigger rendering task into smaller chunks & managable pieces,

 These chunks can be prioritzed. React can pause whatever it's doing & prioritize task based on urgency:
      a. High priority: user Inputs
      b. Medium priority: data fetch
      c. Low Priority: Logging or analytics



1. To enable the incremnetal rendering
2. Break the rendering work into smaller chunks
2. Allow react to pause and resume the work by avoiding main thread blocking


Ultimatly to improve user expericene by making the app smoother & more responsive
```

**Primary Goals:**

#### 1. **Incremental Rendering**
```
Break rendering work into chunks
Pause work to let browser handle urgent tasks (animations, user input)
Resume work later
```

#### 2. **Ability to Pause, Abort, or Reuse Work**
```javascript
// Example scenario:
User typing (high priority) → Pause current render
Handle keystroke immediately
Resume previous render when idle
```

#### 3. **Assign Priority to Different Types of Updates**
```
High Priority: User input, animations
Medium Priority: Data fetching
Low Priority: Analytics, logging
```

#### 4. **Time-Slicing**
```
Spread rendering work across multiple frames
Keep UI responsive
60 FPS target
```

**The Core Philosophy:**
```
"Rendering should not block the main thread"
```

**Benefits:**
- Smoother user experience
- Better perceived performance
- Can handle large component trees
- Enables Concurrent Features (Suspense, useTransition)

---

### Q230: What is concurrent rendering?

**Your Answer:**
```
React can work on multiple task at the same time without having to finsh one completly.
 Quickly switching between task and prioritze the task is what concurrent rendering.


 React can start redering a part of a component, pause it if needed and go handle user input so the whole app feels smooth.

```

**Definition:**
- React can work on multiple renders simultaneously
- Can interrupt rendering to handle more urgent tasks
- Can prepare UI updates in memory before committing

**Key Concept: Concurrent ≠ Parallel**
```
Parallel: Multiple tasks running at the exact same time (requires multiple cores)
Concurrent: Multiple tasks in progress, but only one executing at a time (time-slicing)
```

**How Concurrent Rendering Works:**
```
1. Start rendering update A (low priority)
2. User clicks button (high priority)
3. Pause update A
4. Render update B (button click)
5. Commit update B to DOM
6. Resume update A
7. Commit update A to DOM
```

**Visual Timeline:**
```
Time →
[====A====]           [====A====]     Without concurrent
[==A==][B][==A==]                     With concurrent (B interrupts A)
```

**Concurrent Features Enabled:**
- **Suspense:** Show fallback while loading
- **useTransition:** Mark updates as non-urgent
- **useDeferredValue:** Defer expensive computations
- **Automatic batching:** Batch all updates

**Real-World Example:**
```javascript


function TransitionExample() {
    const [ input, setInput ] = useState('')
    const [ list, setList ] = useState([])
    const [ isPending, startTransition ] = useTransition()


    const handleChange = (e) => {
        setInput(e.target.value)
        startTransition(() => {
            const newList = Array.from({length: 20000}, (_, i) => ({id: i}))
            setList(newList)
        })
    }
}

```


```

// Heavy computation happening
function SearchResults() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  // UI stays responsive while searching
  // User can keep typing without lag
  return <Results query={deferredQuery} />;
}
```

---

### Q231: Difference between async mode and concurrent mode?

**Your Answer:**
```
[Write your answer here]
```

**History Lesson:**

| Term | Timeline | Status | Meaning |
|------|----------|--------|---------|
| **Async Mode** | 2018 (experimental) | Deprecated | Early name for concurrent features |
| **Concurrent Mode** | 2019-2021 (experimental) | Replaced | All-or-nothing concurrent rendering |
| **Concurrent Features** | 2022+ (React 18) | Current | Opt-in concurrent features |

**Why the Name Changed:**

**Async Mode** (2018):
```javascript
// Experimental - all or nothing
ReactDOM.createRoot(container).render(<App />);
```
- Implied everything was async
- Confused developers
- Too vague

**Concurrent Mode** (2019-2021):
```javascript
// Still all or nothing
ReactDOM.createRoot(container).render(<App />);
```
- Better name
- But forced entire app to be concurrent
- Breaking changes for some apps

**Concurrent Features** (React 18 - Current):
```javascript
// Opt-in per feature
import { useTransition, useDeferredValue, Suspense } from 'react';

function App() {
  const [isPending, startTransition] = useTransition();

  // Only this update is concurrent
  startTransition(() => {
    setSearchQuery(input);
  });
}
```
- **Opt-in:** Choose which updates are concurrent
- **Gradual adoption:** Works with existing code
- **Backwards compatible:** Non-breaking

**Key Difference:**
```
Async/Concurrent Mode: Entire app uses concurrent rendering
Concurrent Features: Opt-in per update/component
```

---

### Q252: How does React update the screen in an application?

**Your Answer:**
```
React update the screen in two phase
1. Reconcilliation: which can be paused
2. Commit to the Dom : which cannot be paused.


```

**The Two-Phase Process:**

#### Phase 1: Render Phase (Can be interrupted)
```
1. Component re-renders due to state/props change
2. React calls your component function
3. Creates new Virtual DOM tree
4. Runs diffing algorithm
5. Identifies what changed
```

#### Phase 2: Commit Phase (Cannot be interrupted)
```
6. Apply changes to real DOM
7. Run useLayoutEffect hooks
8. Browser paints screen
9. Run useEffect hooks
```

**Visual Flow:**
```
State Change
    ↓
┌─────────────────────┐
│   RENDER PHASE      │ ← Can pause here (Fiber)
│ - Call components   │
│ - Build VDOM        │
│ - Calculate diff    │
└─────────────────────┘
    ↓
┌─────────────────────┐
│   COMMIT PHASE      │ ← Cannot pause (must be sync)
│ - Update real DOM   │
│ - Run effects       │
└─────────────────────┘
    ↓
Browser Paints
```

**In React 18 with Concurrent Features:**
```javascript
// 1. State changes
const [count, setCount] = useState(0);
setCount(1);

// 2. React schedules update
// 3. RENDER PHASE (interruptible):
//    - React calls component functions
//    - Builds new fiber tree
//    - Diffs with old tree
//    - Can pause if higher priority work comes in

// 4. COMMIT PHASE (synchronous):
//    - Updates DOM all at once
//    - Runs layout effects
//
// 5. Browser paints

// 6. Effects run (after paint)
```

**Key Insight:**
```
Render Phase: "What should the UI look like?"  (Interruptible)
Commit Phase: "Make it happen!"                (Must be fast & sync)
```

---

### Q253: How does React batch multiple state updates?

**Your Answer:**
```
Any state updates that happen in the current event. 10s , 100s , all are waited and processed them all at once in one render
This means component rerneder once, even if you  can setState multiple times.

React automatically batches multiple state update that happen during the same event loop.
If you have bunch of setState calss that all happen in response to the same user action, like a single click. React will group them together and process them all at once in a single render.


```

**Batching Definition:**
```
Multiple setState calls → Single re-render
Improves performance by reducing re-renders
```

**React 17 and Earlier (Limited Batching):**
```javascript
// ✅ Batched (inside event handlers)
function handleClick() {
  setCount(c => c + 1);    //
  setFlag(f => !f);        // } Single re-render
  setName('John');         //
}

// ❌ NOT batched (in promises, setTimeout, async)
setTimeout(() => {
  setCount(c => c + 1);    // Re-render 1
  setFlag(f => !f);        // Re-render 2
  setName('John');         // Re-render 3
}, 1000);

fetch('/api').then(() => {
  setCount(c => c + 1);    // Re-render 1
  setFlag(f => !f);        // Re-render 2
});
```

**React 18 (Automatic Batching Everywhere):**
```javascript
// ✅ ALL batched automatically
setTimeout(() => {
  setCount(c => c + 1);    //
  setFlag(f => !f);        // } Single re-render
  setName('John');         //
}, 1000);

fetch('/api').then(() => {
  setCount(c => c + 1);    //
  setFlag(f => !f);        // } Single re-render
});

// ✅ Even in native event handlers
element.addEventListener('click', () => {
  setCount(c => c + 1);    //
  setFlag(f => !f);        // } Single re-render
});
```

**How Batching Works:**
```
1. State update scheduled
2. React marks component as "needs update"
3. Waits for more updates (batching window)
4. Collects all updates
5. Re-renders once with all changes
```

**Visual:**
```
Without Batching:
setA(1) → Render → Paint
setB(2) → Render → Paint
setC(3) → Render → Paint
Total: 3 renders

With Batching:
setA(1) ┐
setB(2) ├→ Collect → Render → Paint
setC(3) ┘
Total: 1 render
```

**Benefits:**
- Fewer re-renders
- Better performance
- Prevents "half-finished" UI states

---

### Q254: Is it possible to prevent automatic batching?

**Your Answer:**
```
[Write your answer here]
```

**Yes! Use `flushSync` (but rarely needed)**

**Syntax:**
```javascript
import { flushSync } from 'react-dom';

function handleClick() {
  flushSync(() => {
    setCounter(c => c + 1);
  }); // DOM updated here

  // Read from DOM with updated value
  console.log(ref.current.textContent); // Shows new count

  setFlag(f => !f); // Separate render
}
```

**When You Might Need It:**

#### 1. **Measuring DOM Before Next Update**
```javascript
function Component() {
  const [items, setItems] = useState([]);
  const listRef = useRef();

  function addItem() {
    flushSync(() => {
      setItems([...items, newItem]);
    });

    // DOM is updated, can measure now
    const height = listRef.current.scrollHeight;
    scrollToBottom(height);
  }
}
```

#### 2. **Third-Party Library Integration**
```javascript
function Chart() {
  function updateData() {
    flushSync(() => {
      setData(newData);
    });

    // Chart library needs DOM to be updated
    chartLibrary.refresh();
  }
}
```

#### 3. **Focus Management**
```javascript
function Form() {
  function addField() {
    flushSync(() => {
      setFields([...fields, newField]);
    });

    // New field is in DOM, can focus it
    newFieldRef.current.focus();
  }
}
```

**⚠️ Warning:**
```javascript
// DON'T do this!
function handleClick() {
  flushSync(() => setCount(1));  // Render
  flushSync(() => setName('a')); // Render
  flushSync(() => setFlag(true)); // Render
  // Total: 3 renders (defeats batching!)
}

// DO this instead:
function handleClick() {
  setCount(1);    //
  setName('a');   // } Batched → 1 render
  setFlag(true);  //
}
```

**Key Point:**
```
Automatic batching is almost always what you want.
Only use flushSync when you NEED to read from DOM
between updates.
```

---

## 📝 Summary Notes

**Why Fiber was created:**
```
To break bigger sync rendering into smaller chucks which can be inturrpted and prioritzed.
```

**How concurrent rendering changes React:**
```
  It allow react can pause, resume and priritize react rendering. Thus makes react adaptable & responsive.

```

**React 17 vs React 18 batching:**
```
 in 17, batching are mostly limited to sync updates like event handlers. Aync updates, like promises or setTimeout were not batched together.
 in 18, automatic batching works acorss the board inculdig aync updates.
```

---

## ✅ Self-Check

Mark when you can confidently explain:
- [✅] What Fiber is and why it was necessary
- [✅ ] The main goals of Fiber architecture
- [✅] Concurrent rendering vs traditional rendering
- [✅] History: Async mode → Concurrent mode → Concurrent features
- [✅] Two phases: Render and Commit
- [✅] How batching works in React 17 vs 18
- [✅] When and how to use flushSync
- [✅] Real-world benefits of concurrent features

---

## 🎯 Interview Practice Questions

Practice answering OUT LOUD:

### 1. "Explain React Fiber and why it was necessary"
**Answer structure:**
- Problem in React 15 (blocking renders)
- What Fiber is (incremental rendering)
- Benefits (smooth UI, prioritization)
- Real example

**Time yourself:** 3-5 minutes

### 2. "How does React 18's automatic batching differ from React 17?"
**Answer structure:**
- React 17: Only in event handlers
- React 18: Everywhere (timeouts, promises, native events)
- Code example showing difference
- Why it matters (performance)

**Time yourself:** 2-3 minutes

### 3. "Walk me through what happens when setState is called"
**Answer structure:**
- Render phase (interruptible)
- Commit phase (sync)
- Effects phase
- How Fiber enables this

**Time yourself:** 3-4 minutes

---

## 💡 Key Insights

**The Big Idea:**
```
Fiber = Making React rendering interruptible

Before: Start render → Must finish → UI frozen
After:  Start render → Pause for urgent work → Resume → Smooth UI
```

**For Senior Interviews - Emphasize:**
1. **Trade-offs:** Complexity vs smoothness
2. **When to use:** Concurrent features are opt-in
3. **Real impact:** Better UX for complex apps
4. **Migration:** Mostly backwards compatible

---

