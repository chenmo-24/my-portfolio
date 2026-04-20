const codeSnippets = [
  {
    id: "bubble-sort",
    title: { zh: "冒泡排序", en: "Bubble Sort" },
    lang: "C++",
    code: `void bubbleSort(int arr[], int n) {
  for (int i = 0; i < n - 1; i++) {
    for (int j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        int tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
      }
    }
  }
}`,
  },
  {
    id: "fibonacci",
    title: { zh: "斐波那契 (DP)", en: "Fibonacci (DP)" },
    lang: "JavaScript",
    code: `function fib(n) {
  const dp = [0, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}`,
  },
  {
    id: "quicksort",
    title: { zh: "快速排序", en: "Quick Sort" },
    lang: "C++",
    code: `void quickSort(int a[], int l, int r) {
  if (l >= r) return;
  int i = l - 1, j = r + 1, x = a[(l + r) >> 1];
  while (i < j) {
    do i++; while (a[i] < x);
    do j--; while (a[j] > x);
    if (i < j) std::swap(a[i], a[j]);
  }
  quickSort(a, l, j);
  quickSort(a, j + 1, r);
}`,
  },
  {
    id: "binary-search",
    title: { zh: "二分查找", en: "Binary Search" },
    lang: "Python",
    code: `def binary_search(nums, target):
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target:
            return mid
        if nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1`,
  },
];

export default codeSnippets;
