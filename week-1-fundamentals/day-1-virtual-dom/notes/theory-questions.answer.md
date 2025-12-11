# Day 1: React Philosophy & Virtual DOM - Theory Questions

**Study Time:** 2 hours
**Date Started:** ___________

---

## 🎯 Questions to Master

### Q1: What is React?

**Your Answer:**
```
it's a frontend library. Not a framework. It use something called jsx as the techonology to render view. It's essential a single page applicaton meaning no page reloading is required. 


JSX is javascript xml. 

We write in JSX because :
 1. easier to visualize your ui compoents & the tree strucutre. 
 2. instead of bunch of createEleemnt()

 React(JSX) => View



 React is component based libary. 

 # Declarative Paradigm
 At the heart of react phishopy,is it's declarative paradigm. 
 You define how the view looks like and you let the react handle the actaul work to update the dom. 

 You define WHAT, React takes care of HOW?


const [count, setCount] = useState(1)

we use setCount to update  the state, react will handle the rest olike re-rendering the compoennt with new value

```


# Virutal Dom 

Like weight in mermory of actuall dom. A js object to mirror actual DOM elements. 


When state changes:
  1. React update the virtual Dom first
  2. React then does diffing process where it compares this update virutal dom with the prev version of virtual Dom
  3. React figures out what changed without touching the real dom yet
  4. React updates the real dom as efficeintly as possible. 

Virtual Dom is a tool that allows React to minimize direct manipulation of the real DOM. 
When dom changes, it's expensive browser has to do alot of work:
1. Recalculate Layout
2. reapply styles
3. Repaint parts of the Screens

By using virtual dom., react batch and optimize these changes by reducing the number of times real dom has to be touched. 

 It's a buffer or middlelayer. 

 


**Key Points to Cover:**
- JavaScript library for building UIs
- Component-based architecture
- Declarative paradigm
- Virtual DOM for efficiency
- Maintained by Meta/Facebook

---

### Q2: What is the history behind React's evolution?

**Your Answer:**
```
The mother of invention?

Facebook was dealing with really complex user interfaces, especially with things like 
  a. dynamic
  b. frequent updating news feed

They need something that is more efficient & make the code more managable as the app grows. 


MVC or Model View Controller
1. Model fetches data & business logic
2. View: updates the looks of the app
c. Controller: Takes user input from the view and process by updating model. Handle the logic part

MVC dealing with complex and dynamic makes it more expensive & also the code grew larger became harder to manage. 
The complexity lead to bottle neck.


React helped solve the complexity and maintainability issues that could arise with large-scale MVC apps

```


# Evolution

In the early days of react, class components were the goto way of creating components.
Class component allowed us to 

1. use lifecycle methods
    a. componentDidMount
    b. compoenntWillUnmount
2. manage state. 
3. Hanlde complex logic. 

However class components were more verbose & harder to read as compoennts grows.

Then came functional compoennts, which are simpler and concise. 
Introuction of hooks unleased the full potential of functional component. 

Without hooks, functional component would just be presentational.
WIth hooks we can
  1. Manage state
  2. Handle side effects
  3. Mimic lifecycle methods. 


  ## How hooks empowers?

    useEffects(() => {}, []) => loads on the component mount

    useEffetcts(() =>{
      return () => { clean up here after the component unmount}
    },[])
    





The main necessity of hooks was making functional compoennt equal to class component. 
Hooks was introduced to empower functional compoent to have
  a. States : Any data that compoennt needs to remeber and manage
  b. Side Effects: Operation that can effect other outside of components. 
      i. What the compoentn does that impacts the outside words. 


  Make them just powerful as Class component. 


### Side Effects:
 These needs to be managed effectively to avoid
  1. Memory Leaks
  2. Unwanted Behaviour
  3. hooks like useEffect can help you control when and how these effects run. 






# React Fiber Architecture?

Name fiber was choosen to be more like fiber, to be more adaptible & efficient. 

Reimplementation of React core algorithm to improve performance & enable more advanced features. 
1. Allow bettter prioritaztion of updates
2. Smoother rendering
3. Ability to interrupt and resume work. 
4. Better error handling
 


One of the reason why React has remained so powerfuol & popular over the years. 



**Key Points to Cover:**
- Created by Jordan Walke at Facebook (2011)
- Open-sourced in 2013
- Solved problems with MVC frameworks
- Evolution: Class components → Hooks (2019)
- React Fiber architecture (2017)
- Concurrent features (React 18, 2022)

---

### Q3: What are the major features of React?

**Your Answer:**
```
[Write your answer here]
```

**Key Points to Cover:**
- JSX
- Virtual DOM
- Component-based
- Unidirectional data flow
- Hooks
- Server-side rendering
- Strong ecosystem

---

### Q16: What is the Virtual DOM?

**Your Answer:**
```
[Write your answer here]
```

**Key Points to Cover:**
- Lightweight copy of real DOM
- JavaScript object representation
- In-memory tree structure
- Enables efficient updates
- Foundation of React's performance

---

### Q17: How does the Virtual DOM work?

**Your Answer:**
```
[Write your answer here]
```

**Key Points to Cover:**
1. **Render:** Component state changes → new Virtual DOM tree
2. **Diff:** Compare new tree with previous tree
3. **Reconcile:** Calculate minimal set of changes
4. **Commit:** Apply changes to real DOM in batch

**The Process:**
```
State Change
    ↓
Create new Virtual DOM tree
    ↓
Diff with previous Virtual DOM
    ↓
Calculate changes (diffing algorithm)
    ↓
Batch update real DOM
```

---

### Q18: Shadow DOM vs Virtual DOM - What's the difference?

**Your Answer:**
```
[Write your answer here]
```

**Comparison Table:**

| Feature | Virtual DOM | Shadow DOM |
|---------|-------------|------------|
| Purpose | Performance optimization | Encapsulation |
| What is it? | Programming concept | Browser technology |
| Part of | React (library feature) | Web Components (browser standard) |
| Scope | React apps only | Any web app |
| Goal | Minimize DOM operations | Isolate component styles/markup |

---

### Q212: Real DOM vs Virtual DOM difference?

**Your Answer:**
```
[Write your answer here]
```

**Comparison:**

| Aspect | Real DOM | Virtual DOM |
|--------|----------|-------------|
| Speed | Slow (browser operations) | Fast (JavaScript objects) |
| Updates | Expensive, triggers reflow/repaint | Cheap, in-memory |
| Manipulation | Direct | Through diffing algorithm |
| Memory | Higher overhead | Lower overhead |
| Updates UI | Directly | Batched updates |

**Real DOM Problem:**
```javascript
// Every change triggers expensive operations:
element.style.color = 'red';    // Reflow + Repaint
element.style.fontSize = '14px'; // Reflow + Repaint
element.textContent = 'Hello';   // Reflow + Repaint
```

**Virtual DOM Solution:**
```javascript
// Collect all changes, apply once:
// 1. Make all changes in Virtual DOM
// 2. Calculate diff
// 3. Apply ALL changes to Real DOM in one batch
```

---

### Q28: What is reconciliation?

**Your Answer:**
```
[Write your answer here]
```

**Key Points to Cover:**
- **Definition:** Process of syncing Virtual DOM with Real DOM
- **When it happens:** After state/props change
- **What it does:** Determines what changed and how to update efficiently
- **Algorithm:** Diffing algorithm compares trees
- **Result:** Minimal set of DOM operations

**The Reconciliation Process:**
```
1. State/Props Change
2. Re-render component (create new Virtual DOM)
3. Compare new Virtual DOM with old Virtual DOM
4. Identify differences
5. Update only changed parts in Real DOM
```

---

### Q202: What is the diffing algorithm?

**Your Answer:**
```
[Write your answer here]
```

**Key Points to Cover:**
- **Purpose:** Compare two Virtual DOM trees efficiently
- **Complexity:** O(n) instead of O(n³)
- **How:** Uses heuristics for speed
- **Output:** List of changes (patches) to apply

**Traditional tree diff:** O(n³) - too slow!
**React's diff:** O(n) - practical for UIs

**How React achieves O(n):**
1. **Assumes:** Two elements of different types produce different trees
2. **Uses keys:** To identify which children changed
3. **Level-by-level:** Compares nodes at same level only

---

### Q203: What are the rules covered by the diffing algorithm?

**Your Answer:**
```
[Write your answer here]
```

**The Two Main Rules:**

#### Rule 1: Elements of Different Types → Destroy and Rebuild
```jsx
// Before:
<div><Counter /></div>

// After:
<span><Counter /></span>

// Result: Destroy old div and Counter, create new span and Counter
```

#### Rule 2: Elements of Same Type → Update Attributes
```jsx
// Before:
<div className="before" title="stuff" />

// After:
<div className="after" title="stuff" />

// Result: Only update className, keep same DOM node
```

#### Rule 3: Recursively Process Children
```jsx
// Before:
<ul>
  <li>A</li>
  <li>B</li>
</ul>

// After:
<ul>
  <li>A</li>
  <li>B</li>
  <li>C</li>
</ul>

// Result: Keep A and B, append C
```

#### Rule 4: Keys Help Identify Children
```jsx
// Without keys - BAD:
<ul>
  <li>A</li>
  <li>B</li>
</ul>
// Insert C at beginning:
<ul>
  <li>C</li>  // React thinks A changed to C
  <li>A</li>  // React thinks B changed to A
  <li>B</li>  // React adds B
</ul>
// Result: Updates A→C, B→A, adds B (inefficient!)

// With keys - GOOD:
<ul>
  <li key="a">A</li>
  <li key="b">B</li>
</ul>
// Insert C at beginning:
<ul>
  <li key="c">C</li>  // React adds C
  <li key="a">A</li>  // React keeps A
  <li key="b">B</li>  // React keeps B
</ul>
// Result: Just adds C, keeps A and B (efficient!)
```

---

## 📝 Summary Notes

**Why Virtual DOM exists:**
```
[Write your understanding of WHY Virtual DOM was created]
```

**How it works (in your own words):**
```
[Explain the full process from state change to DOM update]
```

**When would Virtual DOM be SLOWER than direct manipulation?**
```
[Think about edge cases]
```

---

## ✅ Self-Check

Mark when you can confidently explain:
- [ ] What React is and its core philosophy
- [ ] The evolution from MVC to React
- [ ] What the Virtual DOM is (can draw a diagram)
- [ ] How reconciliation works step-by-step
- [ ] The diffing algorithm and its rules
- [ ] Shadow DOM vs Virtual DOM
- [ ] Real DOM vs Virtual DOM trade-offs
- [ ] When to use keys and why they matter

---

## 🎯 Interview Practice Questions

After studying, practice answering these OUT LOUD:

1. **"Explain how React's Virtual DOM works to a non-technical person"**
   - Practice explaining without technical jargon
   - Use analogies (blueprint, shopping list, etc.)

2. **"When would the Virtual DOM be slower than direct DOM manipulation?"**
   - Think about simple apps with few updates
   - Very small updates
   - Static pages

**Time yourself:** Aim for 3-5 minute answers

---

**Study Progress:**
- Started: ___________
- Completed: ___________
- Ready for hands-on: [ ]
