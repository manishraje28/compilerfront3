import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { IconButton, Dropdown } from 'rsuite';
import PlayIcon from '@rsuite/icons/legacy/Play';
import { Navbar, Container, Content, FlexboxGrid, Input } from 'rsuite';
import Editor from "@monaco-editor/react";

import stubs from './defaultStubs';

function App() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('Choose...');
  const [input, setInput] = useState('');
  const [originalCode, setOriginalCode] = useState('');
  const [theme, setTheme] = useState('vs-dark');

  useEffect(() => {
    setLanguage('Choose..');
    setCode(stubs['Choose..']);
    setOriginalCode(stubs['Choose..']);
  }, []);


  const handleLanguageSelect = (value) => {
    if (typeof code !== 'undefined' && code.trim() !== originalCode.trim()) {
      const shouldSwitch = window.confirm(
        "Are you sure you want to change the language? WARNING: Your current code will be lost."
      );
      if (!shouldSwitch) {
        return;
      }
    }
    setLanguage(value);
    if (stubs[value] !== undefined) {
      setCode(stubs[value]);
      setOriginalCode(stubs[value]);
    }
  };

  const handleThemeSelect = (value) => {
    setTheme(value);
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        language,
        code,
        input
      };

      const { data } = await axios.post('http://localhost:8001/run', payload);
      setOutput(data.output);
    } catch (error) {
      console.error('Error:', error);
      setOutput('Error in the code. Please check the code and try again.');
    }
  };

  return (
    <Container>
      <Content style={{ margin: '20px 10px' }}>
        <FlexboxGrid justify="space-between" style={{ margin: '10px' }}>
          <FlexboxGrid style={{ padding: '12px', borderRadius: '15px', width: '900px' }}>
            <FlexboxGrid style={{ border: '1px solid white', padding: '12px', borderRadius: '15px', width: '900px', marginBottom: '5px' }}>
              <Navbar>
                <Dropdown title={language} onSelect={handleLanguageSelect}>
                  <Dropdown.Item eventKey="Java">Java</Dropdown.Item>
                  <Dropdown.Item eventKey="cpp">C++</Dropdown.Item>
                  <Dropdown.Item eventKey="Python">Python</Dropdown.Item>
                </Dropdown>

              </Navbar>
              <FlexboxGrid.Item style={{ marginLeft: '110px', position: 'fixed', zIndex: '1000' }}>
                <Navbar>
                  <Dropdown title={theme} onSelect={handleThemeSelect}>
                    <Dropdown.Item eventKey="vs-dark">Dark</Dropdown.Item>
                    <Dropdown.Item eventKey="vs-light">Light</Dropdown.Item>
                    <Dropdown.Item eventKey="hc-black">High Contrast</Dropdown.Item>
                  </Dropdown>
                </Navbar>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item style={{ marginLeft: '755px', position: 'fixed' }}>
                <Navbar>
                  <IconButton icon={<PlayIcon />} placement="right" onClick={handleSubmit}>Run</IconButton>
                </Navbar>
              </FlexboxGrid.Item>
            </FlexboxGrid>
            <Editor
              height="480px"
              language={language.toLowerCase()}
              theme={theme}
              value={code}
              options={{
                fontSize: "16px",
                formatOnType: true,
                autoClosingBrackets: true,
                minimap: { enabled: false }, 
                wordWrap: "on",
                lineNumbers: "on", 
                scrollbar: {
                  vertical: "auto",
                  horizontal: "auto" 
                },
                folding: true,
                renderIndentGuides: true, 
                glyphMargin: true, 
              }}

              onChange={(value) => setCode(value)}
            />
          </FlexboxGrid>

          <div className="opt" style={{ border: '1px solid white', padding: '30px', borderRadius: '25px' }}>
            <label htmlFor="it">Input</label>
            <Input
              as="textarea"
              rows={10}
              id="it"
              placeholder="Enter your input here"
              value={input}
              onChange={(value) => setInput(value)}
              style={{ width: '300px', marginTop: '5px', marginBottom: '15px' }}
            />
            <label htmlFor="ot">Output</label>
            <Input
              as="textarea"
              id="ot"
              rows={10}
              placeholder="Output will be shown here"
              value={output}
              style={{ width: '300px', marginTop: '5px' }}
              readOnly
            />
          </div>
        </FlexboxGrid>
      </Content>
    </Container>
  );
}

export default App;
