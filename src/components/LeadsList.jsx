// src/pages/LeadsPage.jsx
import React, { useState, useEffect } from "react";
import TasksList from "../components/TasksList";
import { getAllLeadsAPI } from "../apis/leadAPI";
import '../style/leads.css';

const LeadsPage = () => {
  const [leads, setLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const leads = await getAllLeadsAPI();
      setLeads(leads);
      console.log('leads', leads)
    } catch (error) {
      console.error("Failed to fetch leads", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLeadClick = (lead) => {
    setSelectedLead(lead);
  };

  return (
    <div className="leads-container">
      {selectedLead ? (
        <TasksList leadId={selectedLead.company_id} leadName={selectedLead.company} />
      ) : (
        <div className="leads-list">
          <h1>Leads</h1>
          {loading ? (
            <div className="spinner"></div>
          ) : (
            leads.map((lead) => (
              <div
                key={lead._id}
                className="lead-item"
                onClick={() => handleLeadClick(lead)}
              >
                {lead.company}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default LeadsPage;
