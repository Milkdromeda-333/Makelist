import { useState } from "react";
import { FiEdit2, FiTrash } from "react-icons/fi";

export default function Item({ item }) {
    
    
    return (
        <div className={`center-row rounded px-2 ${item.isCompleted ? "text-gray-600 bg-gray-700 line-through" : ""}`}>
            <input
                type="checkbox" name="completed" id="completed"
                className="
                before:bg-apple after:bg-apple
                dark:before:bg-dark-blue dark:after:bg-dark-blue"
            />

            <span className="text-xl md:text-xl">{item.title}</span>

            <div className="ml-auto center-row gap-2">
                <FiEdit2 />
                <FiTrash />
            </div>
        </div>
    )
}