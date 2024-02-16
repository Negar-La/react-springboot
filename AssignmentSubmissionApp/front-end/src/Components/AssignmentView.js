import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLocalStrorage } from '../util/useLocalStorage';
import ajax from '../Services/fetchService';
import { Form, Button, Col, Row, Container, Badge, DropdownButton, Dropdown, ButtonGroup } from 'react-bootstrap';

function AssignmentView() {
  const { id } = useParams();
  const [jwt, setJwt] = useLocalStrorage('', 'jwt');
  const [assignment, setAssignment] = useState({
    branch: '',
    github_url: '',
  });

  const updateAssignment = (prop, value) => {
    const newAssignment = { ...assignment };
    newAssignment[prop] = value;
    setAssignment(newAssignment);
    console.log(newAssignment);
  };

  const handleSubmit = () => {
    ajax(`/api/assignments/${id}`, 'PUT', jwt, assignment).then((assignmentData) => setAssignment(assignmentData));
  };

  useEffect(() => {
    ajax(`/api/assignments/${id}`, 'GET', jwt).then((assignmentData) => {
      //  if (assignmentData.branch === null) assignmentData.branch = "";
      //  if (assignmentData.github_url === null) assignmentData.github_url = "";

      setAssignment(assignmentData);
    });
  }, []);

  return (
    <Container className="mt-5">
      <Row className="d-flex align-items-center">
        <Col>
          <h3>Assignment {id}</h3>
        </Col>
        <Col>
          <Badge bg="info" style={{ fontSize: '1em' }}>
            {' '}
            {assignment.status}
          </Badge>
        </Col>
      </Row>

      {assignment ? (
        <>
          <Form.Group as={Row} className="my-3" controlId="formPlaintext">
            <Form.Label column sm="3" md="2">
              Assignment Number:
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <DropdownButton as={ButtonGroup} id="assignmentName" variant="info" title="number">
                {['1', '2', '3', '4', '5'].map((assignmentNum) => (
                  <Dropdown.Item eventKey={assignmentNum}>{assignmentNum}</Dropdown.Item>
                ))}
              </DropdownButton>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="my-3" controlId="formPlaintext">
            <Form.Label column sm="3" md="2">
              Github URL:
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <Form.Control id="github_url" onChange={(e) => updateAssignment('github_url', e.target.value)} value={assignment.github_url || ''} type="url" placeholder="https//github/username/reponame" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
            <Form.Label column sm="3" md="2">
              Branch:
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <Form.Control type="text" id="branch" onChange={(e) => updateAssignment('branch', e.target.value)} value={assignment.branch || ''} placeholder="main" />
            </Col>
          </Form.Group>

          <Button onClick={() => handleSubmit()}>Submit Assignment</Button>
        </>
      ) : (
        <></>
      )}
    </Container>
  );
}

export default AssignmentView;
