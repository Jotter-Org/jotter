import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Card,  Typography, Row } from 'antd';
import AuthContext from '../../context/auth/authContext';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';

const { Title } = Typography;

function UserPage() {
  const authContext = useContext(AuthContext);
  const { loadUser } = authContext;

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

  const postDelete = async id => {
    try {
      await axios.delete(`/api/blog/${id}`);

      axios.get('/api/blog/').then(response => {
        setBlogs(response.data.blogs);
      });
    } catch (err) {
      throw err;
    }
  };

  const renderCards = blogs.map((blog, index) => {
    return (
      <Grid key={index} component={Paper} elevation={2} square>
        <Card
          hoverable
          style={{ maxWidth: '700px', margin: '2rem auto' }}
          actions={[
            // <a href={`/blog/post/${blog._id}`}>
            //   {' '}
            //   <Icon type="ellipsis" key="ellipsis" />
            // </a>,
            <span style={{ display: 'inline' }}>
              <Link to={`/blog/post/${blog._id}`}>
                <button className="btn btn-block" text-align="right">
                  View
                </button>
              </Link>
              
              <br />
              <button className="btn btn-block-del" text-align="left" onClick={() => postDelete(blog._id)}>
                {/* <Icon type="delete" /> */}
                  Delete
              </button>
              <br />
            </span>
          ]}
        >
          <div className="padding-blog" style={{ padding: 10 }}>
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
      <Title level={2}> My Blogs </Title>
      <br />
      <Link to="/blog/create">
        <button text-align="center"  className="btn btn-block">
          Write a New Blog
        </button>
      </Link>
      <br />
      <Row gutter={[32, 16]}>{renderCards}</Row>
      <br />
      
    </div>
  );
}

export default UserPage;
