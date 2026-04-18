"use client";

import { FormField } from "../forms/form-field";

export default function BrandsSubmitForm() {
    return (
        <form className="sapce-y-6">
            <FormField
            label="Brand name"
            name="name"
            id="name"
            placeholder="My Awesome Brand"
            required
            onChange={() => {}}
            error=""
            />
        </form>
    );
}