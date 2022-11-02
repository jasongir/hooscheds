import React from 'react';
import {Link} from 'react-router-dom';
import {useState, useEffect} from "react";
import {useNavigate, Routes, Route} from "react-router-dom";
import { Button } from 'react-bootstrap';

export default function CourseSearch() {
	return (
		<>
			<section className="heading">
				<h1>Welcome to Hooscheds</h1>
				<p>Course Search</p>
			</section>
			<div className="input-group">
            <div className="form-outline">
                <input type="search" id="form1" className="form-control" />
                <label className="form-label" htmlFor="form1">Search</label>
            </div>
            <button type="button" className="btn btn-primary">
                <i className="fas fa-search"></i>
            </button>
            </div>
		</>
	);
}
