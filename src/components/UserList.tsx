import React, { useState, useEffect, ChangeEvent } from 'react';
import { User } from "../types/User";
import { USERS_PER_PAGE } from '../constants';
import Pagination from './Pagination';

import "../styles/UserList.css";

const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [num, setNum] = useState<number>(0); // Represents the offset
    const [loading, setLoading] = useState<boolean>(true);
    const [hasMoreUsers, setHasMoreUsers] = useState<boolean>(true);
    const [inputPage, setInputPage] = useState<string>("1");
  
    useEffect(() => {
      const fetchUsers = async () => {
        setLoading(true);
        const response = await fetch(`https://give-me-users-forever.vercel.app/api/users/${num}/next`);
        const data = await response.json();
        if (data.users.length < USERS_PER_PAGE) {
          setHasMoreUsers(false);
        } else {
          setHasMoreUsers(true);
        }
        setUsers(data.users);
        setLoading(false);
      };
  
      fetchUsers();
    }, [num]);
  
    const currentPage = Math.floor(num / USERS_PER_PAGE) + 1;
  
    const nextPage = () => {
      if (hasMoreUsers && (currentPage % 5 === 0)) {
        setNum((prevNum) => prevNum + USERS_PER_PAGE);
        setInputPage((currentPage + 1).toString());
      } else if (hasMoreUsers) {
        setNum((prevNum) => prevNum + USERS_PER_PAGE);
        setInputPage((currentPage + 1).toString());
      }
    };
  
    const prevPage = () => {
      if (num >= USERS_PER_PAGE) {
        setNum((prevNum) => prevNum - USERS_PER_PAGE);
        setInputPage((currentPage - 1).toString());
        setHasMoreUsers(true);
      }
    };
  
    const goToPage = (pageNumber: number) => {
      const newNum = (pageNumber - 1) * USERS_PER_PAGE;
      setNum(newNum);
      setInputPage(pageNumber.toString());
      setHasMoreUsers(true);
    };
  
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      if (value === "" || /^[1-9][0-9]*$/.test(value)) {
        setInputPage(value);
      }
    };
  
    const handleInputBlur = () => {
      const pageNumber = Math.max(Number(inputPage), 1);
      goToPage(pageNumber);
    };

  return (
    <div>
      <h1>User List</h1>
      {loading ? (
        <div className="spinner-container"><div className="spinner"></div></div>
      ) : (
        <div className="user-list-container">
            <table>
                <thead>
                    <tr>
              
                    <th>Name</th>
                    <th>ID</th>
                    <th>Company</th>
                    <th>Job title</th>
                    <th>Phone</th>
                    <th>Work Email</th>
                    <th>Personal Email</th>
                    
                    </tr>
                </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.ID}>
                {/* <td>
                  <div className="profile-pic">
                    {user.FirstNameLastName[0]}{user.ID}
                  </div>
                </td> */}
                <td>{user.FirstNameLastName}</td>
                <td>{user.ID}</td>
                <td>{user.Company}</td>
                <td>{user.JobTitle}</td>
                <td>{user.Phone}</td>
                <td>{user.Email}</td>
                <td>{user.EmailAddress}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        nextPage={nextPage}
        prevPage={prevPage}
        goToPage={goToPage}
        inputPage={inputPage}
        handleInputChange={handleInputChange}
        handleInputBlur={handleInputBlur}
        hasMoreUsers={hasMoreUsers}
      />
    </div>
  );
};

export default UserList;
