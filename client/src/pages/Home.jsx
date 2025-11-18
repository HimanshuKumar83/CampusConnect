import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaBullhorn, FaTasks, FaUsers } from 'react-icons/fa';
import { announcementAPI, eventAPI, activityAPI } from '../services/api';

import chancellorImg from "../assets/chancellor.jpg";
import proChancellorImg from "../assets/prochancellor.jpg";
import hodImg from "../assets/hod.jpg";

const Home = () => {
  const [data, setData] = useState({
    announcements: [],
    events: [],
    activities: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // STATIC LEADERSHIP ARRAY — replaces API
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

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);

        const [announcementsRes, eventsRes, activitiesRes] = await Promise.all([
          announcementAPI.getAll({ limit: 3 }),
          eventAPI.getUpcoming(),
          activityAPI.getHighlighted()
        ]);

        setData({
          announcements: announcementsRes.data.announcements || announcementsRes.data,
          events: eventsRes.data,
          activities: activitiesRes.data
        });
      } catch (err) {
        setError('Failed to load homepage data. Please try again later.');
        console.error('Error fetching home data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading) {
    return (
      <div className="loading-spinner">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading...</p>
      </div>
    );
  }

  return (
    <div className="fade-in">
      {/* HERO SECTION */}
      <section className="hero-section">
        <Container>
          <Row>
            <Col lg={12} className="text-center">
              <h1 className="hero-title">Welcome to Brainstorm Club</h1>
              <p className="hero-subtitle">
                Empowering minds, building futures, and creating lasting impact through 
                innovation, collaboration, and endless possibilities.
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

      {error && (
        <Container className="mt-4">
          <Alert variant="danger">{error}</Alert>
        </Container>
      )}

      {/* STATIC LEADERSHIP SECTION */}
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
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="leadership-img"
                  />
                  <h5 className="leadership-name">{leader.name}</h5>
                  <p className="leadership-position">{leader.title}</p>
                </Card>
              </Col>
            ))}
          </Row>

          <Row>
            <Col className="text-center">
              <Button as={Link} to="/leadership" variant="outline-primary">
                <FaUsers className="me-2" />
                View All Leadership
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Announcements, Events, Activities */}
      {/* — Existing sections remain unchanged — */}

      {/* Recent Announcements */}
      <section className="section-padding">
        <Container>
          <Row className="mb-4">
            <Col>
              <h3 className="text-gradient">Recent Announcements</h3>
            </Col>
            <Col xs="auto">
              <Button as={Link} to="/announcements" variant="outline-primary" size="sm">
                View All
              </Button>
            </Col>
          </Row>

          <Row>
            {data.announcements.slice(0, 3).map((announcement) => (
              <Col md={4} key={announcement._id} className="mb-3">
                <div className={`announcement-item ${announcement.priority === 'Urgent' ? 'announcement-urgent' : announcement.priority === 'High' ? 'announcement-high' : ''}`}>
                  <h6 className="fw-bold">{announcement.title}</h6>
                  <p className="mb-2">{announcement.content.substring(0, 100)}...</p>
                  <small className="text-muted">
                    {new Date(announcement.publishDate).toLocaleDateString()}
                  </small>

                  <div className="mt-2">
                    <span className={`badge bg-${announcement.priority === 'Urgent' ? 'danger' : announcement.priority === 'High' ? 'warning' : 'info'}`}>
                      {announcement.priority}
                    </span>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Upcoming Events */}
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
            {data.events.slice(0, 3).map((event) => (
              <Col md={4} key={event._id} className="mb-4">
                <Card className="event-card">
                  {event.image && (
                    <Card.Img
                      variant="top"
                      src={`/uploads/events/${event.image.filename}`}
                      className="event-image"
                      alt={event.title}
                    />
                  )}
                  <Card.Body>
                    <div className="event-date">
                      {new Date(event.date).toLocaleDateString()}
                    </div>

                    <Card.Title>{event.title}</Card.Title>
                    <Card.Text>{event.description.substring(0, 100)}...</Card.Text>

                    <div className="d-flex justify-content-between align-items-center">
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

      {/* Featured Activities */}
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
            {data.activities.slice(0, 3).map((activity) => (
              <Col md={4} key={activity._id} className="mb-4">
                <Card className="activity-card">
                  <div className={`activity-status status-${activity.status.toLowerCase().replace(' ', '-')}`}>
                    {activity.status}
                  </div>

                  {activity.images && activity.images[0] && (
                    <Card.Img
                      variant="top"
                      src={`/uploads/activities/${activity.images[0].filename}`}
                      style={{ height: '200px', objectFit: 'cover' }}
                      alt={activity.title}
                    />
                  )}

                  <Card.Body>
                    <Card.Title>{activity.title}</Card.Title>
                    <Card.Text>{activity.description.substring(0, 100)}...</Card.Text>

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
