import React, { useEffect, useState, useContext } from 'react';

import QuillEditor from '../../../editor/QuillEditor';
import { Typography, Button, Form, message } from 'antd';
import axios from 'axios';
import AuthContext from '../../../context/auth/authContext';

//import { useSelector } from 'react-redux';

const { Title } = Typography;

function CreatePage(props) {
  const authContext = useContext(AuthContext);
  const { user, loadUser } = authContext;
  //const user = useSelector(state => state.user);

  useEffect(() => {
    loadUser();
    //eslint-disable-next-line
  }, []);

  const [content, setContent] = useState('');
  //eslint-disable-next-line
  const [files, setFiles] = useState([]);

  const onEditorChange = value => {
    setContent(value);
    console.log(content);
  };

  const onFilesChange = files => {
    setFiles(files);
  };

  const onSubmit = event => {
    event.preventDefault();

    setContent('');

    /*if (user.userData) {
      return alert('Please Log in first');
    }*/

    const variables = {
      content: content,
      userID: user._id
    };

    axios.post('/api/blog/createPost', variables).then(response => {
      if (response) {
        message.success('Post Created!');

        setTimeout(() => {
          props.history.push('/');
        }, 2000);
      }
    });
  };

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center' }}>
        <Title level={2}> Editor</Title>
      </div>
      <QuillEditor
        placeholder={'Start Posting Something'}
        onEditorChange={onEditorChange}
        onFilesChange={onFilesChange}
      />

      <Form onSubmit={onSubmit}>
        <div style={{ textAlign: 'center', margin: '2rem' }}>
          <Button
            size="large"
            htmlType="submit"
            onSubmit={onSubmit}
            text-align="center" 
            className='btn btn-block'
          >
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CreatePage;
