import React from "react";
import "./CSS/RadioGroup.css";

const RadioGroup = () => {
  return (
    <div class="radio-inputs">
      <label>
        <input name="engine" type="radio" class="radio-input" />
        <span class="radio-tile">
          <span class="radio-label">Bicycle</span>
        </span>
      </label>
      <label>
        <input name="engine" type="radio" class="radio-input" checked="" />
        <span class="radio-tile">
          <span class="radio-label">Motorbike</span>
        </span>
      </label>
      <label>
        <input name="engine" type="radio" class="radio-input" />
        <span class="radio-tile">
          <span class="radio-label">Car</span>
        </span>
      </label>
    </div>
  );
};

export default RadioGroup;
