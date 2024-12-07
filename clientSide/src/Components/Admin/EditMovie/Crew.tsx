import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import AddIcon from '../../../assets/Icons/Admin/AddIcon';
import DeleteIconWhite from '../../../assets/Icons/Admin/DeleteIconWhite';
import SearchBar from '../Credits/SearchBar';
import JobSearchBar from '../Credits/Jobs/JobSearchBar';
import { addCrewMember, deleteCrewMemeber } from '../../../api/api';
import EditIcon from '../../../assets/Icons/Admin/EditIcon';

const Crew = ({ movieData, setMovieData }) => {
  const crewData = movieData.credits?.crew || [];
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleAddCastMemberModal = () => {
    console.log(isModalOpen)
    setIsModalOpen(!isModalOpen);
  };

  const [selectedPerson, setSelectedPerson] = useState(null);
  const [jobOccupation, setJobOccupation] = useState({
    job: '',
    department: ''
  });

  const { movieId } = useParams();

  const handleAddCrew = async () => {
    try {
      const data = {
        id: selectedPerson.id,
        name: selectedPerson.name,
        original_name: selectedPerson.original_name,
        department: jobOccupation.department,
        job: jobOccupation.job
      }
      
      await addCrewMember(movieId, data);

      setMovieData((prevData) => ({
        ...prevData,
        credits: {
          ...prevData.credits,
          crew: [...(prevData.credits?.crew || []), data],
        },
      }));

      alert('Crew have been added successfuly!');
    }
    catch (error) {
      console.error('Failed to add crew memeber:', error);
    }
  }

  const handleDeleteCrew = async (id) => {
    const confirmation = window.confirm("Are you sure you want to delete this crew member?");

    if (!confirmation) return;

    try {
      await deleteCrewMemeber(movieId, id);
      alert('Crew member has been deleted successfully!');

      setMovieData((prevData) => ({
        ...prevData,
        credits: {
          ...prevData.credits,
          crew: prevData.credits?.crew.filter((crewMember) => crewMember.id !== id),
        },
      }));
    }
    catch (error) {
      console.error('Failed to delete crew member:', error);
      alert('Failed to delete the crew member. Please try again.');
    }
  };

  if (crewData) {
    return (
      <div className="crew">
        <div className="crew-header">
          <button
            onClick={toggleAddCastMemberModal}
            className="add-crew-button"
          >
            <AddIcon />
            <span>Add New Cast Member</span>
          </button>
        </div>
        <div className="crew-table">
          <table>
            <thead>
              <tr>
                <th>Person</th>
                <th>Job</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {crewData.map((crewMember, index) => (
                <tr key={index}>
                  <td>
                    <span>{crewMember.name || crewMember.original_name}</span>
                  </td>
                  <td>{crewMember.job}</td>
                  <td className="action-buttons">
                    <button
                      className="edit-button"
                    >
                      <EditIcon />
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteCrew(crewMember.id)}
                    >
                      <DeleteIconWhite />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {isModalOpen && (
          <div className="absolute top-0 left-1/2 z-[100]">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/2 bg-[#1E1E1E] text-white p-6 rounded-lg w-[43.75rem] shadow-2xl border border-[#CC511D]">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#CC511D]">Add Crew Member</h2>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setSelectedPerson(null);
                    setJobOccupation({
                      job: '',
                      department: ''
                    });
                  }}
                  className="text-white hover:text-[#CC511D] transition duration-200"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-4">
                <SearchBar selectedPerson={selectedPerson} setSelectedPerson={setSelectedPerson} type={'crew'} />
                <JobSearchBar jobOccupation={jobOccupation} setJobOccupation={setJobOccupation} />
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      setSelectedPerson(null);
                      setJobOccupation({
                        job: '',
                        department: ''
                      })
                    }}
                    className="px-4 py-2 bg-[#444444] text-white rounded-md hover:bg-[#555555] transition duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-[#CC511D] text-white rounded-md hover:bg-[#FF7031] transition duration-200"
                    onClick={() => handleAddCrew()}
                  >
                    Add Crew Member
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Crew
