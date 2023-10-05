import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-js-pagination";
import Chart from "chart.js/auto";
import Sidebar from "./Sidebar"


import "./css/sidebar.css";
import DashboardIcon from "./img/Icon.png";
import Vector from "./img/Vector.png";
import Close from "./img/Close.png";
import PH from "./img/PH.png";
import PL from "./img/PL.png";
import PM from "./img/PM.png";
import face1 from"./img/face1.png"
import face2 from"./img/face2.png"
import bell from"./img/bell.png"
import logface from"./img/logface.png"
import done from"./img/Done.png"
import InP from"./img/InP.png"

function Mainpage() {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  

  async function fetchData() {
    try {
      const response = await fetch(
        'https://6363c8f68a3337d9a2e7d805.mockapi.io/api/to-do'
      );
      const data = await response.json();
      console.table(data);
      setTasks(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setTasks([]);
    }
  }

  useEffect(() => {
    fetchData();
  
  }, []);

  function getPriorityIcon(priority) {
    switch (priority) {
      case "HIGH":
        return <img src={PH} alt="High Priority" />;
      case "MEDIUM":
        return <img src={PM} alt="Medium Priority" />;
      case "LOW":
        return <img src={PL} alt="Low Priority" />;
      default:
        return null;
    }
  }

  function formatDate(dateString) {
    const options = { month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  }

  // Calculate the total number of pages
  const pageCount = Math.ceil(tasks.length / itemsPerPage);

  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the tasks array to display only the current page
  const displayedTasks = tasks.slice(startIndex, endIndex);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  function prepareChartData(tasks) {
    const priorities = ["HIGH", "MEDIUM", "LOW"];
    const taskCounts = priorities.map((priority) =>
      tasks.filter((task) => task.priority === priority).length
    );
    return {
      labels: priorities,
      datasets: [
        {
          data: taskCounts,
          backgroundColor: ["#EB5757", "#F2C94C", "#2F80ED"],
        },
      ],
    };
  }

  function renderPriorityChart(tasks) {
    const chartData = prepareChartData(tasks);
  
    const ctx = document.getElementById("priorityChart").getContext("2d");
  
   
    const existingChart = Chart.getChart(ctx);
    if (existingChart) {
      existingChart.destroy();
    }
  
    new Chart(ctx, {
      type: "pie",
      data: chartData,
    });
  }
  useEffect(() => {
    renderPriorityChart(tasks);
  }, [tasks]);

  return (
    <div>
        <Sidebar/>

      <header>
      <nav className="navbar navbar-inverse" style={{ marginLeft: "276px",marginTop: "12px" }}>
  <div className="container-fluid">
    <div className="navbar-header">
      <a className="navbar-brand" href="#">
        Dashboard
      </a>
    </div>

    <ul className="nav navbar-nav navbar-right">
      <div className="navbar-form" style={{ display: "flex" }}>
        <li style={{ marginRight: "10px", marginTop: "12px" }}>
          <a href="#">
            <img src={bell} alt="bell" />
          </a>
        </li>
        <li style={{ marginTop: "5px" }}>
          <a href="#">
            <img src={logface} alt="logface" />
          </a>
        </li>
      </div>
    </ul>
  </div>
</nav>

        <div className="welcome-container">
        <div className="welcome-content">
            <div className="text-container">
              <div className="welcome-text">Welcome back, John Doe</div>
              <div className="additional-text">
                The end of the year is coming. Are you planning your performance interviews? 
                You can do this super efficiently with Acmy.{" "}
                <br /> <span className="underline-text">Look here for more information.</span>
              </div>
            </div>
            <div className="image-container">
              <img src={Vector} alt="Image" className="welcome-image" />
              <img src={Close} alt="Image" className="close-img" />
            </div>
          </div>
        </div>
        
        <div className="container3">
          <div className="row">
            <div className="container2 custom-container">
              <div className="col mb-3 text-black">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col" style={{ textAlign: "left" }}>
                        Tasks
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedTasks.map((task) => (
                      <tr key={task.id}>
                        <td style={{ textAlign: "left" }}>
                          {getPriorityIcon(task.priority)}
                          {task.todo}
                          <br></br>
                          {!task.completed && (
                            <button
                              style={{
                                color: "#BC006D",
                                background: "none",
                                border: "none",
                                borderRadius: "24px",
                              }}
                            >
                              Mark as done
                            </button>
                          )}
                        </td>
                        <td style={{ textAlign: "left", color: task.completed ? "#219653" : "#F2C94C" }}>
  {task.completed ? (
    <>
      <img src={done} alt="Done" />
    </>
  ) : (
    <>
      <img src={InP} alt="In Progress" /> 
    </>
  )}
</td>
                        <td style={{ textAlign: "left" }}>
                          {formatDate(task.createdAt)}
                        </td>
                      </tr>
           ))}
                  </tbody>
                </table>

               
                <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ReactPaginate
           activePage={currentPage}
           itemsCountPerPage={itemsPerPage}
           totalItemsCount={tasks.length}
           pageRangeDisplayed={5}
           onChange={handlePageChange}
           itemClass="page-item"
           linkClass="page-link"
           prevPageText="<"
           nextPageText=">"
           firstPageText={null}
           lastPageText={null}
           />
           </div>

              </div>
            </div>

            <div className="container1 col-md-6">
              <div className="col mb-3 text-black">
              <table className="table">
  <thead>
    <tr>
      <th scope="col">Activity Feed</th>
    </tr>
  </thead>
  <tbody>
    <tr>
    <th scope="row">
  <img src={face1} alt="Mark" />
  <strong>Kushantha Charuka</strong> created <span style={{ color: "#BC006D" }}>
    Contract #00124 need John Beige’s signature</span>
    <br></br><span style={{ color: "#757575" }}>Sep 16, 2022 at 11:30 AM</span>
</th>


      <td></td>
    </tr>
    <tr>
      <th scope="row"> <img src={face2} alt="Mark" />
      Lorem ipsum <strong>dolor sit amet,</strong> consectetur adipiscing elit. <strong>Maecenas</strong> pretium neque
    
    <br></br><span style={{ color: "#757575" }}>Sep 16, 2022 at 11:45 AM</span></th>
    </tr>
    <tr>
    <th scope="row"> <img src={face2} alt="Mark" />
      Lorem ipsum <strong>dolor sit amet,</strong> consectetur adipiscing elit. <strong>Maecenas</strong> pretium neque
    
    <br></br><span style={{ color: "#757575" }}>Sep 16, 2022 at 11:45 AM</span></th>
    </tr>
  </tbody>
</table>

              </div>
            </div>


<div className="container4 col-md-6">
  <div className="col mb-3 text-black d-flex flex-column align-items-center">
    <h4>Tasks Priorities</h4>
    <canvas id="priorityChart" width="200" height="200"></canvas>
  </div>
</div>


          </div>
        </div>
      </header>
    </div>
  );
}

export default Mainpage;
