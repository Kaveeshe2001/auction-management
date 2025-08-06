import { Col, Container, Row } from "react-bootstrap";
import Breadcrumb from "../../components/Shared/Breadcrumb/Breadcrumb"
import Form from "../../components/ui/Form/Form";
import Input from "../../components/ui/Input/Input";
import { useState } from "react";
import Textarea from "../../components/ui/Textarea/Textarea";
import PrimaryButton from "../../components/ui/Buttons/PrimaryButton/PrimaryButton";

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    subject?: string;
  }>({});
  
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const newErrors: {
        name?: string;
        email?: string;
        subject?: string;
    } = {};

    if (!name) newErrors.name = 'Name is required';
    if (!email) newErrors.email = 'Email is required';
    if (!subject) newErrors.subject = 'Subject is required';

    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
    } 
  }

  return (
    <div>
      <Breadcrumb>
        <h1>Conatct Us</h1>

        <ul className="breadcrumb-list">
            <li>
                <a href="/">Home</a>
            </li>
            <li>Contact Us</li>
        </ul>
      </Breadcrumb>

      <Container>
        <Row style={{ width: '100%' }} className="mb-20">
            <Col md={3}>
                <h1>Contact</h1>
            </Col>
            <Col md={9}>
                <Row style={{ width: '100%' }}>
                    <Form onSubmit={handleSubmit}>
                        <Col md={6}>
                            <Input
                                type='text'
                                label='Name'
                                placeHolder='Kaveesha Waduge'
                                id='name'
                                name='name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                error={errors.name}
                            />
                        </Col>
                        <Col md={6}>
                            <Input
                                type='email'
                                label='Email'
                                placeHolder='ks@example.com'
                                id='email'
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={errors.email}
                            />
                        </Col>
                        <Col md={12}>
                            <Input
                                type='text'
                                label='subject'
                                placeHolder='eg: To give feedbacks'
                                id='subject'
                                name='subject'
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                error={errors.subject}
                            />
                        </Col>
                        <Col md={12}>
                            <Textarea
                                label='Message'
                                placeHolder='Your Message'
                                name='message'
                                id='message'
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </Col>

                        <div className="auth-btn">
                            <PrimaryButton
                                variant='white'
                                text='Submit'
                                type='submit'
                            />
                        </div>
                    </Form>
                </Row>
            </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Contact;
