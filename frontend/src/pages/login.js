import React, { useState } from 'react';

import Auth from 'mongoose-admin-panel-frontend/lib/services/Auth';

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert,
} from 'reactstrap';

import logo from '../assets/images/logo.png';

export default function LoginPage() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);

  function login() {
    Auth.login(username, password)
      .then(() => {
        window.location.reload();
      })
      .catch(() => setError(true));
  }

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '80%',
          maxWidth: '800px',
          transform: 'translate(-50%,-50%)',
        }}
      >
        <Container className="w-100 d-flex align-items-center justify-content-center">
          <Row className="w-100">
            <Card className="w-100">
              <CardBody>
                <Row>
                  <Col md={4} className="mb-sm-4">
                    <div className="d-flex align-items-center justify-content-center h-100">
                      <img src={logo} style={{ maxWidth: '80%' }} alt="Mongoose Admin Panel" />
                    </div>
                  </Col>
                  <Col md={8}>
                    <Form>
                      <div className="form-group">
                        <label>Username</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Username"
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label>Password</label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      {error ? (
                        <div className="form-group">
                          <Alert color="danger">Can't login. Check your credentials.</Alert>
                        </div>
                      ) : null}
                      <div className="mt-3">
                        <Button color="primary" className="mr-2 mb-2" onClick={() => login()}>
                          Login
                        </Button>
                      </div>
                    </Form>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Row>
        </Container>
      </div>
    </div>
  );
}
