import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ id: null, title: '', content: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.id) {
      setPosts(posts.map((post) => (post.id === form.id ? form : post)));
    } else {
      setPosts([...posts, { ...form, id: Date.now() }]);
    }
    setForm({ id: null, title: '', content: '' });
  };

  const handleEdit = (post) => {
    setForm(post);
  };

  const handleDelete = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <h1>Bootstrap CRUD 게시판</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>제목</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>내용</Form.Label>
              <Form.Control
                as="textarea"
                name="content"
                value={form.content}
                onChange={handleChange}
                rows={3}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {form.id ? '수정' : '추가'}
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>제목</th>
                <th>내용</th>
                <th>수정 / 삭제</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td>{post.title}</td>
                  <td>{post.content}</td>
                  <td>
                    <Button
                      variant="warning"
                      className="me-2"
                      onClick={() => handleEdit(post)}
                    >
                      수정
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(post.id)}>
                      삭제
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
