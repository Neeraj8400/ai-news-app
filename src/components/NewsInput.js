import React from "react";

const NewsInput = ({ value, onChange }) => (
  <div className="input-section">
    <label>Paste or write your news (Hindi/English):</label>
    <textarea
      rows={6}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Type or paste news script here..."
      spellCheck={false}
    />
  </div>
);

export default NewsInput;