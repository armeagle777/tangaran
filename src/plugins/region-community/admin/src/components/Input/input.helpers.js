export const autocompleteListener = () => {
  const comboboxes = document.querySelectorAll('[role="combobox"]');
  comboboxes.forEach(function (combobox) {
    combobox.setAttribute('autocomplete', 'off');
  });
};
