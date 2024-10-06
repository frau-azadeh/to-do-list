"use client"
import React from 'react';
import Menu from '../components/Menu';
import IconBar from '../components/IconBar';
import TaskManager from '../components/TaskManager';

const page = () => {
   
  return (
    <>
        <Menu/>
            <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
                <IconBar/>

                <div className="px-6 pt-6 2xl:container">
                    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
                  
                      <TaskManager/>
                    </div>
                </div>
            </div>
    </>                 
  );
}

export default page;
