import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { Spinner, ListGroup, Card, Button } from "react-bootstrap"; // Import Bootstrap components

const HeadlinesShow = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize the navigate function
  const [headlines, setHeadlines] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchHeadlines = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://news-mania-eta.vercel.app/api/headlines/${id}`);
      const data = await response.json();

      if (data && data.length > 0) {
        setHeadlines(data);
      } else {
        setHeadlines([]);
      }
    } catch (error) {
      console.error("Error fetching headlines:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeadlines();
  }, [id]);

  return (
    <div className="container my-5">
      

      <h2 className="text-center mb-4 bg-warning">Top Headlines for Newspaper {id}</h2>

      {/* Display loading spinner when data is being fetched */}
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Card>
          <Card.Body>
            {headlines.length > 0 ? (
              <ListGroup>
                {headlines.map((headline, index) => (
                  <ListGroup.Item key={index} className="bg-info">
                    <a
                      href={headline.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none  text-dark"
                    >
                      <strong >{headline.title}</strong>
                    </a>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <p className="text-center">No headlines available for this newspaper.</p>
            )}
          </Card.Body>
        </Card>
      )}
      <Button variant="secondary" onClick={() => navigate(-1)} className="mb-4" style={{margin:'6px'}}>
        Back
      </Button>
    </div>
  );
};

export default HeadlinesShow;
