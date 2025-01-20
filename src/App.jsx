import React, { useState, useEffect } from "react";
import './App.css';

const App = () => {
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderlined, setIsUnderlined] = useState(false);

  const applyStyle = (styleType) => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const selectedText = selection.toString();

    if (!selectedText) return; // Ensure there is selected text

    const span = document.createElement("span");
    if (styleType === "bold") {
      span.style.fontWeight = isBold ? "normal" : "bold";
      setIsBold(!isBold);
    } else if (styleType === "italic") {
      span.style.fontStyle = isItalic ? "normal" : "italic";
      setIsItalic(!isItalic);
    } else if (styleType === "underline") {
      span.style.textDecoration = isUnderlined ? "none" : "underline";
      setIsUnderlined(!isUnderlined);
    }

    range.deleteContents();
    range.insertNode(span);
    span.appendChild(document.createTextNode(selectedText));
  };

  const applyList = (listType) => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const selectedText = selection.toString();

    if (!selectedText) return; // Ensure there is selected text

    const lines = selectedText.split("\n"); // Split selected text into lines
    const list = document.createElement(listType); // Create <ul> or <ol> based on listType

    lines.forEach((line) => {
      if (line.trim() !== "") {
        const li = document.createElement("li");
        li.textContent = line.trim(); // Add trimmed line as list item
        list.appendChild(li);
      }
    });

    range.deleteContents();
    range.insertNode(list);
  };

  const applyHeading = (headingType) => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const selectedText = selection.toString();

    if (!selectedText) return; // Ensure there is selected text

    const heading = document.createElement(headingType);
    heading.textContent = selectedText;

    range.deleteContents();
    range.insertNode(heading);
  };

  const applyLink = () => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const selectedText = selection.toString();

    if (!selectedText) return; // Ensure there is selected text

    const url = prompt("Enter the URL for the link:");

    if (url) {
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.target = "_blank"; // Opens link in a new tab
      anchor.textContent = selectedText;

      range.deleteContents();
      range.insertNode(anchor);
    }
  };

  const handleClickOnLinks = (e) => {
    if (e.target.tagName === "A") {
      e.preventDefault();
      const href = e.target.href;
      if (href) {
        window.open(href, "_blank");
      }
    }
  };

  useEffect(() => {
    const contentEditableDiv = document.getElementById("editable");
    contentEditableDiv.addEventListener("click", handleClickOnLinks);

    return () => {
      contentEditableDiv.removeEventListener("click", handleClickOnLinks);
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        width: "100%",
      }}
    >
    <h1>Text Editor</h1>
      <div style={{ display: "flex", marginBottom: "10px" }}>
        <select
          style={{
            padding: "5px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#2C3A47",
            color: "white",
            border: "none",
            marginRight: "10px",
            borderRadius: "4px",
          }}
          onChange={(e) => applyHeading(e.target.value)}
        >
          <option value="" disabled>
            Heading
          </option>
          <option value="h1">H1</option>
          <option value="h2">H2</option>
          <option value="h3">H3</option>
          <option value="h4">H4</option>
          <option value="h5">H5</option>
          <option value="span">SPAN</option>
        </select>
        <button
          style={{
            padding: "5px 10px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#2C3A47",
            color: "white",
            border: "none",
            borderRadius: "4px",
            marginRight: "10px",
          }}
          onClick={() => applyStyle("bold")}
        >
          <b>B</b>
        </button>
        <button
          style={{
            padding: "5px 10px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#2C3A47",
            color: "white",
            border: "none",
            borderRadius: "4px",
            marginRight: "10px",
          }}
          onClick={() => applyStyle("italic")}
        >
          <i>I</i>
        </button>
        <button
          style={{
            padding: "5px 10px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#2C3A47",
            color: "white",
            border: "none",
            borderRadius: "4px",
            marginRight: "10px",
          }}
          onClick={() => applyStyle("underline")}
        >
          <u>U</u>
        </button>
        <button
          style={{
            padding: "5px 10px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#2C3A47",
            color: "white",
            border: "none",
            borderRadius: "4px",
            marginRight: "10px",
          }}
          onClick={() => applyList("ul")}
        >
          Bullet Points
        </button>
        <button
          style={{
            padding: "5px 10px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#2C3A47",
            color: "white",
            border: "none",
            borderRadius: "4px",
            marginRight: "10px",
          }}
          onClick={() => applyList("ol")}
        >
          Numbered List
        </button>
        <button
          style={{
            padding: "5px 10px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#2C3A47",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
          onClick={applyLink}
        >
          Link
        </button>
      </div>
      <div
        id="editable"
        contentEditable
        style={{
          width: "80%",
          height: "400px",
          border: "1px solid #ccc",
          padding: "10px",
          marginTop: "10px",
          fontSize: "16px",
          lineHeight: "1.5",
          outline: "none",
          minHeight: "200px",
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
        }}
        suppressContentEditableWarning={true}
      ></div>
    </div>
  );
};

export default App;
