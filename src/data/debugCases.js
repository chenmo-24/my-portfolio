export const debugCases = [
  {
    id: "stale-state",
    title: { zh: "状态更新丢失", en: "Lost State Update" },
    desc: {
      zh: "快速点击时计数偶尔只增加一次。",
      en: "Rapid clicks sometimes increment the counter only once.",
    },
    issue: {
      zh: "用户连续点击两次按钮，期望 +2，但界面只 +1。",
      en: "A user clicks a button twice and expects +2, but the UI only shows +1.",
    },
    code: `function Counter() {
  const [count, setCount] = useState(0);

  const addTwice = () => {
    setCount(count + 1);
    setCount(count + 1);
  };

  return <button onClick={addTwice}>{count}</button>;
}`,
    choices: [
      {
        id: "functional-update",
        label: { zh: "使用函数式 setState", en: "Use functional setState" },
        correct: true,
      },
      {
        id: "timeout",
        label: { zh: "用 setTimeout 包住第二次更新", en: "Wrap the second update in setTimeout" },
        correct: false,
      },
      {
        id: "memo",
        label: { zh: "给 addTwice 加 useMemo", en: "Add useMemo to addTwice" },
        correct: false,
      },
    ],
    fix: `const addTwice = () => {
  setCount((current) => current + 1);
  setCount((current) => current + 1);
};`,
    explanation: {
      zh: "两次更新都读取同一个闭包里的 count。函数式更新会基于最新状态连续计算。",
      en: "Both updates read the same closed-over count. Functional updates compute from the latest state.",
    },
  },
  {
    id: "array-mutation",
    title: { zh: "列表没有刷新", en: "List Does Not Refresh" },
    desc: {
      zh: "数据变了，但 React 没有重新渲染列表。",
      en: "Data changes, but React does not re-render the list.",
    },
    issue: {
      zh: "点击添加标签后，数组内容被修改，但界面不稳定。",
      en: "After adding a tag, the array is mutated and the UI becomes unreliable.",
    },
    code: `const addTag = (tag) => {
  tags.push(tag);
  setTags(tags);
};`,
    choices: [
      {
        id: "new-array",
        label: { zh: "创建新数组再更新", en: "Create a new array before updating" },
        correct: true,
      },
      {
        id: "force-update",
        label: { zh: "强制刷新组件", en: "Force refresh the component" },
        correct: false,
      },
      {
        id: "sort-tags",
        label: { zh: "先排序再 setTags", en: "Sort before setTags" },
        correct: false,
      },
    ],
    fix: `const addTag = (tag) => {
  setTags((current) => [...current, tag]);
};`,
    explanation: {
      zh: "React 依赖引用变化判断状态更新。直接 push 会复用旧数组引用。",
      en: "React relies on reference changes for state updates. push reuses the old array reference.",
    },
  },
  {
    id: "missing-key",
    title: { zh: "列表状态串行", en: "List State Mix-up" },
    desc: {
      zh: "删除一项后，输入框内容跑到了另一行。",
      en: "After deleting an item, input content appears on another row.",
    },
    issue: {
      zh: "列表使用 index 作为 key，删除中间项后局部状态错位。",
      en: "The list uses index as key and local row state shifts after deleting an item.",
    },
    code: `{items.map((item, index) => (
  <TodoRow key={index} item={item} />
))}`,
    choices: [
      {
        id: "stable-id",
        label: { zh: "使用稳定 id 作为 key", en: "Use a stable id as key" },
        correct: true,
      },
      {
        id: "random-key",
        label: { zh: "每次生成随机 key", en: "Generate a random key each render" },
        correct: false,
      },
      {
        id: "remove-key",
        label: { zh: "移除 key", en: "Remove the key" },
        correct: false,
      },
    ],
    fix: `{items.map((item) => (
  <TodoRow key={item.id} item={item} />
))}`,
    explanation: {
      zh: "key 描述的是元素身份，不是当前位置。稳定 id 可以让 React 正确保留行状态。",
      en: "A key describes identity, not position. A stable id lets React preserve row state correctly.",
    },
  },
];
