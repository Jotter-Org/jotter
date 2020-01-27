import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Card, Icon, Typography, Row } from 'antd';
import AuthContext from '../../context/auth/authContext';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';

const { Title } = Typography;

function UserPage() {
  const authContext = useContext(AuthContext);
  const { user, loadUser } = authContext;

  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    loadUser();

    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const loadData = () => {
      try {
        axios
          .get('/api/blog/', { cancelToken: source.token })
          .then(response => {
            setBlogs(response.data.blogs);
          });
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('cancelled');
        } else {
          throw error;
        }
      }
    };

    loadData();
    return () => {
      source.cancel();
    };

    //eslint-disable-next-line
  }, []);

  const renderCards = blogs.map((blog, index) => {
    return (
      <Grid key={index} component={Paper} elevation={2} square>
        <Card
          hoverable
          style={{ maxWidth: '700px', margin: '2rem auto' }}
          actions={[
            <a href={`/blog/post/${blog._id}`}>
              {' '}
              <Icon type="ellipsis" key="ellipsis" />
            </a>
          ]}
        >
          <div className="padding-blog" style={{ padding: 10 }}>
            Author: <span style={{ color: 'Grey' }}>{blog.writer.name}</span>
            <div
              style={{
                height: 300,
                maxWidth: '700px',
                margin: '2rem auto',
                overflowY: 'auto',
                marginTop: 10
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            </div>
          </div>
        </Card>
      </Grid>
    );
  });

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <Title level={2}> Blog Lists </Title>
      <br />
      <Row gutter={[32, 16]}>{renderCards}</Row>
      <br />
      <Link to="/blog/create">
        <button text-align="center" className="btn btn-block">
          Write a New Blog
        </button>
      </Link>
    </div>
  );
}

export default UserPage;
