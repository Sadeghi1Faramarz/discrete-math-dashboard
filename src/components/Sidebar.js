// src/components/Sidebar.js

import React from 'react';
import { NavLink } from 'react-router-dom';
import { projects } from '../projects/project-list'; // وارد کردن لیست پروژه‌ها

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>ریاضیات گسسته</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          {/* لینک ثابت برای صفحه اصلی */}
          <li>
            <NavLink to="/" end>
              نمای کلی
            </NavLink>
          </li>

          {/* ایجاد لینک‌ها به صورت پویا از روی لیست پروژه‌ها */}
          {projects.map((project) => (
            <li key={project.id}>
              <NavLink to={project.path}>
                {project.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;