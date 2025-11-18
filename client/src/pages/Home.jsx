import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUsers } from 'react-icons/fa';

import chancellorImg from "../assets/chancellor.jpg";
import proChancellorImg from "../assets/prochancellor.jpg";
import hodImg from "../assets/hod.jpg";

const Home = () => {

  // ---------------- STATIC DATA ----------------

  const announcements = [
    {
      _id: 1,
      title: "Welcome to Brainstorm Club",
      content: "Our club empowers young innovators and leaders.",
      publishDate: "2025-02-10",
      priority: "Normal"
    },
    {
      _id: 2,
      title: "Hackathon 2025 Announced",
      content: "Participate in the biggest tech event of the year.",
      publishDate: "2025-02-11",
      priority: "High"
    },
    {
      _id: 3,
      title: "New Projects Launched",
      content: "Several new student-led projects are now live.",
      publishDate: "2025-02-12",
      priority: "Urgent"
    }
  ];

  const events = [
    {
      _id: 1,
      title: "AI & ML Seminar",
      description: "A full-day seminar on Artificial Intelligence.",
      date: "2025-03-10",
      location: "Auditorium Block A",
      time: "10:00 AM",
      image: null
    },
    {
      _id: 2,
      title: "Tech Summit",
      description: "The biggest tech summit of the year.",
      date: "2025-04-01",
      location: "Main Hall",
      time: "11:00 AM",
      image: null
    },
    {
      _id: 3,
      title: "Innovation Week",
      description: "A celebration of creativity and innovation.",
      date: "2025-04-14",
      location: "Innovation Lab",
      time: "09:00 AM",
      image: null
    }
  ];

  const activities = [
    {
      _id: 1,
      title: "Robotics Project",
      description: "Building an autonomous robot.",
      status: "Ongoing",
      type: "Technical",
      startDate: "2025-02-01",
      images: []
    },
    {
      _id: 2,
      title: "Web Development Bootcamp",
      description: "Training students on MERN stack.",
      status: "Completed",
      type: "Workshop",
      startDate: "2025-01-18",
      images: []
    },
    {
      _id: 3,
      title: "App Development",
      description: "Developing campus connect application.",
      status: "Ongoing",
      type: "Project",
      startDate: "2025-01-05",
      images: []
    }
  ];

  // STATIC LEADERSHIP
  const leaders = [
    {
      name: "DR. Jaspal Singh Sandhu",
      title: "Chancellor",
      image: chancellorImg,
    },
    {
      name: "Dr. Rashmi Mittal",
      title: "Pro-Chancellor",
      image: proChancellorImg,
    },
    {
      name: "Himanshu Kumar Singh",
      title: "Club Head",
      image: hodImg,
    }
  ];

  // ------------------------------------------------------

  return (
    <div className="fade-in">

      {/* HERO SECTION */}
      <section className="hero-section">
        <Container>
          <Row>
            <Col lg={12} className="text-center">
              <h1 className="hero-title">Welcome to Brainstorm Club</h1>
              <p className="hero-subtitle">
                Empowering minds, building futures, and creating lasting impact.
              </p>

              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <Button as={Link} to="/events" variant="light" size="lg">
                  Explore Events
                </Button>
                <Button as={Link} to="/activities" variant="outline-light" size="lg">
                  View Projects
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* LEADERSHIP SECTION */}
      <section className="section-padding">
        <Container>
          <Row className="mb-5">
            <Col className="text-center">
              <h2 className="text-gradient">Our Leadership</h2>
              <p className="lead">Meet the visionary leaders guiding our club</p>
            </Col>
          </Row>

          <Row>
            {leaders.map((leader, index) => (
              <Col md={4} key={index} className="mb-4">
                <Card className="leadership-card slide-up">
                  <img src={leader.image} alt={leader.name} className="leadership-img" />
                  <h5 className="leadership-name">{leader.name}</h5>
                  <p className="leadership-position">{leader.title}</p>
                </Card>
              </Col>
            ))}
          </Row>

          <Row>
            <Col className="text-center">
              <Button as={Link} to="/leadership" variant="outline-primary">
                <FaUsers className="me-2" /> View All Leadership
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ANNOUNCEMENTS */}
      <section className="section-padding">
        <Container>
          <Row className="mb-4">
            <Col><h3 className="text-gradient">Recent Announcements</h3></Col>
            <Col xs="auto">
              <Button as={Link} to="/announcements" variant="outline-primary" size="sm">
                View All
              </Button>
            </Col>
          </Row>

          <Row>
            {announcements.map((announcement) => (
              <Col md={4} key={announcement._id} className="mb-3">
                <div className={`announcement-item 
                  ${announcement.priority === 'Urgent' ? 'announcement-urgent' :
                    announcement.priority === 'High' ? 'announcement-high' : ''}`}>

                  <h6 className="fw-bold">{announcement.title}</h6>
                  <p>{announcement.content}</p>

                  <small className="text-muted">
                    {new Date(announcement.publishDate).toLocaleDateString()}
                  </small>

                  <div className="mt-2">
                    <span className={`badge bg-${
                      announcement.priority === 'Urgent' ? 'danger' :
                      announcement.priority === 'High' ? 'warning' : 'info'
                    }`}>
                      {announcement.priority}
                    </span>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* EVENTS */}
      <section className="bg-light section-padding">
        <Container>
          <Row className="mb-4">
            <Col><h3 className="text-gradient">Upcoming Events</h3></Col>
            <Col xs="auto">
              <Button as={Link} to="/events" variant="outline-primary" size="sm">
                View Calendar
              </Button>
            </Col>
          </Row>

          <Row>
            {events.map((event) => (
              <Col md={4} key={event._id} className="mb-4">
                <Card className="event-card">
                  <Card.Body>
                    <div className="event-date">
                      {new Date(event.date).toLocaleDateString()}
                    </div>

                    <Card.Title>{event.title}</Card.Title>
                    <Card.Text>{event.description}</Card.Text>

                    <div className="d-flex justify-content-between">
                      <small className="text-muted">📍 {event.location}</small>
                      <small className="text-muted">⏰ {event.time}</small>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ACTIVITIES */}
      <section className="section-padding">
        <Container>
          <Row className="mb-4">
            <Col><h3 className="text-gradient">Featured Activities</h3></Col>
            <Col xs="auto">
              <Button as={Link} to="/activities" variant="outline-primary" size="sm">
                View All Projects
              </Button>
            </Col>
          </Row>

          <Row>
            {activities.map((activity) => (
              <Col md={4} key={activity._id} className="mb-4">
                <Card className="activity-card">

                  <div className={`activity-status status-${activity.status.toLowerCase()}`}>
                    {activity.status}
                  </div>

                  <Card.Body>
                    <Card.Title>{activity.title}</Card.Title>
                    <Card.Text>{activity.description}</Card.Text>

                    <div className="d-flex justify-content-between">
                      <small className="text-muted">{activity.type}</small>
                      <small className="text-muted">
                        {new Date(activity.startDate).toLocaleDateString()}
                      </small>
                    </div>
                  </Card.Body>

                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

    </div>
  );
};

export default Home;
