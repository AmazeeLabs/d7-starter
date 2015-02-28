<?php

/**
 * Sets the #required property to FALSE recursively on form elements.
 */
function _custom_make_elements_non_required(&$elements) {
  if (!is_array($elements)) {
    return;
  }
  if (!empty($elements['#required'])) {
    $elements['#required'] = FALSE;
  }
  foreach (element_children($elements) as $key) {
    _custom_make_elements_non_required($elements[$key]);
  }
}
