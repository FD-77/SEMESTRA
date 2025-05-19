import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import "./GPACalculator.css";
import CustomSelect from "../../components/CustomSelect"; // Updated import path

const gradeOptions = [
    { id: '4.0', name: 'A' },
    { id: '3.7', name: 'A-' },
    { id: '3.3', name: 'B+' },
    { id: '3.0', name: 'B' },
    { id: '2.7', name: 'B-' },
    { id: '2.3', name: 'C+' },
    { id: '2.0', name: 'C' },
    { id: '1.7', name: 'C-' },
    { id: '1.3', name: 'D+' },
    { id: '1.0', name: 'D' },
    { id: '0.0', name: 'F' }
];

const GPACalculator = () => {
    const [activeTab, setActiveTab] = useState("class");
    const [classes, setClasses] = useState([]);
    const [activeClassId, setActiveClassId] = useState("");
    const [semesterClasses, setSemesterClasses] = useState([
        { id: 1, name: "", credits: "", grade: "" }
    ]);
    const [isAddingClass, setIsAddingClass] = useState(false);
    const [newClassName, setNewClassName] = useState("");

    const handleAddClass = () => {
        if (!isAddingClass) {
            setIsAddingClass(true);
            return;
        }

        if (newClassName.trim()) {
            const newClass = {
                id: classes.length + 1,
                name: newClassName,
                components: []
            };
            setClasses([...classes, newClass]);
            setActiveClassId(newClass.id);
            setIsAddingClass(false);
            setNewClassName("");
        }
    };

    const handleAddComponent = () => {
        if (activeTab === "class") {
            setClasses(classes.map(cls => {
                if (cls.id === activeClassId) {
                    const newComponent = {
                        id: cls.components.length + 1,
                        name: "",
                        grade: "",
                        weight: ""
                    };
                    return {
                        ...cls,
                        components: [...cls.components, newComponent]
                    };
                }
                return cls;
            }));
        } else {
            const newClass = {
                id: semesterClasses.length + 1,
                name: "",
                credits: "",
                grade: ""
            };
            setSemesterClasses([...semesterClasses, newClass]);
        }
    };

    const handleClassChange = (componentId, field, value) => {
        setClasses(classes.map(cls => {
            if (cls.id === activeClassId) {
                return {
                    ...cls,
                    components: cls.components.map(comp =>
                        comp.id === componentId ? { ...comp, [field]: value } : comp
                    )
                };
            }
            return cls;
        }));
    };

    const handleSemesterChange = (id, field, value) => {
        setSemesterClasses(semesterClasses.map(cls => 
            cls.id === id ? { ...cls, [field]: value } : cls
        ));
    };

    const handleSave = () => {
        if (activeTab === "class") {
            console.log("Saving class components:", classes);
        } else {
            console.log("Saving semester classes:", semesterClasses);
        }
    };

    const handleRemoveClass = () => {
        setClasses(classes.filter(cls => cls.id !== activeClassId));
        setActiveClassId("");
    };

    const handleRemoveComponent = (componentId) => {
        setClasses(classes.map(cls => {
            if (cls.id === activeClassId) {
                return {
                    ...cls,
                    components: cls.components.filter(comp => comp.id !== componentId)
                };
            }
            return cls;
        }));
    };

    const activeClass = classes.find(cls => cls.id === activeClassId);

    return (
        <div className="gpa-calculator">
            <h1 className="gpa-calculator__title">GPA Calculator</h1>
            
            <div className="gpa-calculator__tabs">
                <button 
                    className={`gpa-calculator__tab ${activeTab === "class" ? 'gpa-calculator__tab--active' : 'gpa-calculator__tab--inactive'}`}
                    onClick={() => setActiveTab("class")}
                >
                    Class GPA
                </button>
                <button 
                    className={`gpa-calculator__tab ${activeTab === "semester" ? 'gpa-calculator__tab--active' : 'gpa-calculator__tab--inactive'}`}
                    onClick={() => setActiveTab("semester")}
                >
                    Semester GPA
                </button>
            </div>
            
            <div className="gpa-calculator__content">
                {activeTab === "class" && (
                    <div className="gpa-calculator__class-selector">
                        <CustomSelect
                            options={classes}
                            value={activeClassId}
                            onChange={(value) => setActiveClassId(value ? Number(value) : "")}
                            placeholder="Select Class"
                        />
                        
                        {isAddingClass && (
                            <input
                                type="text"
                                className="gpa-calculator__input"
                                value={newClassName}
                                onChange={(e) => setNewClassName(e.target.value)}
                                placeholder="Enter Class Name"
                                autoFocus
                            />
                        )}
                        
                        <button
                            onClick={handleAddClass}
                            className="gpa-calculator__button"
                        >
                            {isAddingClass ? "Save Class" : "Add New Class"}
                        </button>

                        {activeClassId && !isAddingClass && (
                            <button
                                onClick={handleRemoveClass}
                                className="gpa-calculator__button gpa-calculator__button--remove"
                            >
                                Remove Class
                            </button>
                        )}
                    </div>
                )}

                {activeTab === "class" && activeClassId && !isAddingClass ? (
                    <>
                        <div className="gpa-calculator__header">
                            <div className="gpa-calculator__header-item">Assignment Name</div>
                            <div className="gpa-calculator__header-item">Grade (%)</div>
                            <div className="gpa-calculator__header-item">Weight (%)</div>
                        </div>

                        {activeClass?.components.map((component) => (
                            <div key={component.id} className="gpa-calculator__row">
                                <input
                                    type="text"
                                    className="gpa-calculator__input gpa-calculator__input--name"
                                    placeholder="Assignment Name"
                                    value={component.name}
                                    onChange={(e) => handleClassChange(component.id, "name", e.target.value)}
                                />
                                <input
                                    type="number"
                                    className="gpa-calculator__input gpa-calculator__input--grade"
                                    placeholder="%"
                                    value={component.grade}
                                    onChange={(e) => handleClassChange(component.id, "grade", e.target.value)}
                                />
                                <input
                                    type="number"
                                    className="gpa-calculator__input gpa-calculator__input--weight"
                                    placeholder="%"
                                    value={component.weight}
                                    onChange={(e) => handleClassChange(component.id, "weight", e.target.value)}
                                />
                            </div>
                        ))}
                        
                        <div className="gpa-calculator__actions">
                            <div className="gpa-calculator__button-group">
                                <button
                                    onClick={handleAddComponent}
                                    className="gpa-calculator__button gpa-calculator__button--add"
                                >
                                    <IoMdAdd className="gpa-calculator__icon" />
                                    Add Component
                                </button>
                                {activeClass?.components.length > 0 && (
                                    <button
                                        onClick={() => handleRemoveComponent(activeClass.components[activeClass.components.length - 1].id)}
                                        className="gpa-calculator__button gpa-calculator__button--remove"
                                    >
                                        Remove Assignment
                                    </button>
                                )}
                            </div>

                            <button
                                onClick={handleSave}
                                className="gpa-calculator__button gpa-calculator__button--save"
                            >
                                Calculate GPA
                            </button>
                        </div>
                    </>
                ) : null}

                {activeTab === "semester" ? (
                    <>
                        <div className="gpa-calculator__header">
                            <div className="gpa-calculator__header-item">Class Name</div>
                            <div className="gpa-calculator__header-item">Credits</div>
                            <div className="gpa-calculator__header-item">Grade</div>
                        </div>

                        {semesterClasses.map((cls) => (
                            <div key={cls.id} className="gpa-calculator__row">
                                <input
                                    type="text"
                                    className="gpa-calculator__input gpa-calculator__input--name"
                                    placeholder="Class Name"
                                    value={cls.name}
                                    onChange={(e) => handleSemesterChange(cls.id, "name", e.target.value)}
                                />
                                <input
                                    type="number"
                                    className="gpa-calculator__input gpa-calculator__input--credits"
                                    placeholder="3"
                                    value={cls.credits}
                                    onChange={(e) => handleSemesterChange(cls.id, "credits", e.target.value)}
                                />
                                <CustomSelect
                                    options={gradeOptions}
                                    value={cls.grade}
                                    onChange={(value) => handleSemesterChange(cls.id, "grade", value)}
                                    placeholder="Select Grade"
                                />
                            </div>
                        ))}
                    </>
                ) : null}
            </div>
        </div>
    );
};

export default GPACalculator;
