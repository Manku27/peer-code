const mergeSortedArray = () => {
  let i = m - 1; // index of nums1
  let j = n - 1; // index of nums2
  let k = m + n - 1; // index of final merged array

  while (i >= 0 && j >= 0) {
    if (nums1[i] > nums2[j]) {
      nums1[k] = nums1[i];
      i--;
    } else {
      nums1[k] = nums2[j];
      j--;
    }
    k--;
  }

  while (i >= 0) {
    nums1[k] = nums1[i];
    i--;
    k--;
  }

  while (j >= 0) {
    nums1[k] = nums2[j];
    j--;
    k--;
  }
};
