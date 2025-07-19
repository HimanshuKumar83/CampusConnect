import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Alert, Form } from 'react-bootstrap';
import { FaLinkedin, FaTwitter, FaGithub, FaGlobe, FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { leadershipAPI } from '../services/api';

const Leadership = () => {
  const [leadership, setLeadership] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');

  const positions = ['Chancellor', 'Vice Chancellor', 'HOD', 'Club President', 'Vice President', 'Secretary', 'Treasurer', 'Technical Lead', 'Event Coordinator', 'Other'];

  useEffect(() => {
    fetchLeadership();
  }, [selectedPosition]);

  const fetchLeadership = async () => {
    try {
      setLoading(true);
      const params = {};
      if (selectedPosition) params.position = selectedPosition;
      
      const response = await leadershipAPI.getAll(params);
      setLeadership(response.data);
    } catch (err) {
      setError('Failed to load leadership information. Please try again later.');
      console.error('Error fetching leadership:', err);
    } finally {
      setLoading(false);
    }
  };

  const getPositionColor = (position) => {
    switch (position) {
      case 'Chancellor': return 'primary';
      case 'Vice Chancellor': return 'secondary';
      case 'HOD': return 'success';
      case 'Club President': return 'info';
      case 'Vice President': return 'warning';
      default: return 'light';
    }
  };

  const groupLeadershipByCategory = (leaders) => {
    const institutional = leaders.filter(l => ['Chancellor', 'Vice Chancellor', 'HOD'].includes(l.position));
    const club = leaders.filter(l => !['Chancellor', 'Vice Chancellor', 'HOD'].includes(l.position));
    
    return { institutional, club };
  };

  const renderSocialLinks = (socialLinks) => {
    if (!socialLinks) return null;
    
    return (
      <div className="d-flex gap-2 justify-content-center mt-3">
        {socialLinks.linkedin && (
          <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary">
            <FaLinkedin size={20} />
          </a>
        )}
        {socialLinks.twitter && (
          <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-info">
            <FaTwitter size={20} />
          </a>
        )}
        {socialLinks.github && (
          <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-dark">
            <FaGithub size={20} />
          </a>
        )}
        {socialLinks.website && (
          <a href={socialLinks.website} target="_blank" rel="noopener noreferrer" className="text-success">
            <FaGlobe size={20} />
          </a>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading leadership information...</p>
      </div>
    );
  }

  const { institutional, club } = groupLeadershipByCategory(leadership);

  return (
    <div className="fade-in">
      {/* Header Section */}
      <section className="bg-light py-5">
        <Container>
          <Row>
            <Col lg={8} className="mx-auto text-center">
              <h1 className="text-gradient mb-3">Our Leadership</h1>
              <p className="lead">
                Meet the dedicated individuals who guide our club toward excellence and innovation
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <Container className="py-5">
        {error && <Alert variant="danger">{error}</Alert>}

        {/* Filter */}
        <Row className="mb-5">
          <Col md={6} className="mx-auto">
            <Form.Select
              value={selectedPosition}
              onChange={(e) => setSelectedPosition(e.target.value)}
            >
              <option value="">All Positions</option>
              {positions.map(position => (
                <option key={position} value={position}>{position}</option>
              ))}
            </Form.Select>
          </Col>
        </Row>

        {/* Institutional Leadership */}
        {institutional.length > 0 && (
          <section className="mb-5">
            <Row className="mb-4">
              <Col>
                <h2 className="text-gradient text-center">Institutional Leadership</h2>
                <p className="text-center text-muted">
                  Academic and administrative leaders supporting our club
                </p>
              </Col>
            </Row>
            <Row>
              {institutional.map((leader) => (
                <Col lg={4} md={6} key={leader._id} className="mb-4">
                  <Card className="leadership-card slide-up h-100">
                    {leader.image && (
                      <img
                        src={`/uploads/leadership/${leader.image.filename}`}
                        alt={leader.name}
                        className="leadership-img"
                      />
                    )}
                    <h5 className="leadership-name">{leader.name}</h5>
                    <div className={`badge bg-${getPositionColor(leader.position)} mb-2`}>
                      {leader.position}
                    </div>
                    <p className="text-muted mb-3">{leader.department}</p>
                    
                    {leader.bio && (
                      <p className="small text-justify mb-3">{leader.bio}</p>
                    )}

                    <div className="contact-info">
                      {leader.email && (
                        <div className="d-flex align-items-center mb-2">
                          <FaEnvelope className="me-2 text-primary" />
                          <a href={`mailto:${leader.email}`} className="small">
                            {leader.email}
                          </a>
                        </div>
                      )}
                      
                      {leader.phone && (
                        <div className="d-flex align-items-center mb-2">
                          <FaPhone className="me-2 text-success" />
                          <span className="small">{leader.phone}</span>
                        </div>
                      )}

                      {leader.officeLocation && (
                        <div className="d-flex align-items-center mb-2">
                          <FaMapMarkerAlt className="me-2 text-danger" />
                          <span className="small">{leader.officeLocation}</span>
                        </div>
                      )}

                      {leader.officeHours && (
                        <div className="d-flex align-items-center mb-2">
                          <FaClock className="me-2 text-warning" />
                          <span className="small">{leader.officeHours}</span>
                        </div>
                      )}
                    </div>

                    {leader.education && leader.education.length > 0 && (
                      <div className="mt-3">
                        <strong className="small">Education:</strong>
                        <ul className="mt-1 mb-0" style={{ fontSize: '0.85rem' }}>
                          {leader.education.slice(0, 2).map((edu, index) => (
                            <li key={index}>
                              {edu.degree} - {edu.institution}
                              {edu.year && <span className="text-muted"> ({edu.year})</span>}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {leader.expertise && leader.expertise.length > 0 && (
                      <div className="mt-3">
                        <strong className="small">Expertise:</strong>
                        <div className="mt-1">
                          {leader.expertise.slice(0, 3).map((skill, index) => (
                            <span key={index} className="badge bg-light text-dark me-1 mb-1">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {renderSocialLinks(leader.socialLinks)}
                  </Card>
                </Col>
              ))}
            </Row>
          </section>
        )}

        {/* Club Leadership */}
        {club.length > 0 && (
          <section>
            <Row className="mb-4">
              <Col>
                <h2 className="text-gradient text-center">Club Leadership</h2>
                <p className="text-center text-muted">
                  Student leaders driving our club's vision and activities
                </p>
              </Col>
            </Row>
            <Row>
              {club.map((leader) => (
                <Col lg={4} md={6} key={leader._id} className="mb-4">
                  <Card className="leadership-card slide-up h-100">
                    {leader.image && (
                      <img
                        src={`/uploads/leadership/${leader.image.filename}`}
                        alt={leader.name}
                        className="leadership-img"
                      />
                    )}
                    <h5 className="leadership-name">{leader.name}</h5>
                    <div className={`badge bg-${getPositionColor(leader.position)} mb-2`}>
                      {leader.position}
                    </div>
                    <p className="text-muted mb-3">{leader.department}</p>
                    
                    {leader.bio && (
                      <p className="small text-justify mb-3">{leader.bio}</p>
                    )}

                    <div className="contact-info">
                      {leader.email && (
                        <div className="d-flex align-items-center mb-2">
                          <FaEnvelope className="me-2 text-primary" />
                          <a href={`mailto:${leader.email}`} className="small">
                            {leader.email}
                          </a>
                        </div>
                      )}
                      
                      {leader.phone && (
                        <div className="d-flex align-items-center mb-2">
                          <FaPhone className="me-2 text-success" />
                          <span className="small">{leader.phone}</span>
                        </div>
                      )}
                    </div>

                    {leader.achievements && leader.achievements.length > 0 && (
                      <div className="mt-3">
                        <strong className="small">Achievements:</strong>
                        <ul className="mt-1 mb-0" style={{ fontSize: '0.85rem' }}>
                          {leader.achievements.slice(0, 2).map((achievement, index) => (
                            <li key={index}>
                              {achievement.title}
                              {achievement.year && <span className="text-muted"> ({achievement.year})</span>}
                            </li>
                          ))}
                          {leader.achievements.length > 2 && (
                            <li className="text-muted">+{leader.achievements.length - 2} more...</li>
                          )}
                        </ul>
                      </div>
                    )}

                    {leader.expertise && leader.expertise.length > 0 && (
                      <div className="mt-3">
                        <strong className="small">Expertise:</strong>
                        <div className="mt-1">
                          {leader.expertise.slice(0, 3).map((skill, index) => (
                            <span key={index} className="badge bg-light text-dark me-1 mb-1">
                              {skill}
                            </span>
                          ))}
                          {leader.expertise.length > 3 && (
                            <span className="badge bg-secondary text-white me-1">
                              +{leader.expertise.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {renderSocialLinks(leader.socialLinks)}

                    {leader.joinDate && (
                      <div className="mt-3 text-center">
                        <small className="text-muted">
                          Member since {new Date(leader.joinDate).getFullYear()}
                        </small>
                      </div>
                    )}
                  </Card>
                </Col>
              ))}
            </Row>
          </section>
        )}

        {leadership.length === 0 && !loading && (
          <Row>
            <Col>
              <Alert variant="info" className="text-center">
                No leadership members found matching your criteria.
              </Alert>
            </Col>
          </Row>
        )}

        {/* Leadership Statistics */}
        {leadership.length > 0 && (
          <Row className="mt-5">
            <Col>
              <Card className="bg-light">
                <Card.Body>
                  <h5 className="text-center mb-4">Leadership Overview</h5>
                  <Row className="text-center">
                    <Col md={3}>
                      <strong>{leadership.length}</strong>
                      <br />
                      <small className="text-muted">Total Leaders</small>
                    </Col>
                    <Col md={3}>
                      <strong>{institutional.length}</strong>
                      <br />
                      <small className="text-muted">Institutional</small>
                    </Col>
                    <Col md={3}>
                      <strong>{club.length}</strong>
                      <br />
                      <small className="text-muted">Club Leaders</small>
                    </Col>
                    <Col md={3}>
                      <strong>
                        {leadership.filter(l => l.socialLinks && Object.keys(l.socialLinks).length > 0).length}
                      </strong>
                      <br />
                      <small className="text-muted">Social Profiles</small>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Leadership;