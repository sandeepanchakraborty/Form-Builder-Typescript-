# Form Builder Typescript

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue.svg)](https://www.typescriptlang.org/)
[![Issues](https://img.shields.io/github/issues/sandeepanchakraborty/Form-Builder-Typescript-)](https://github.com/sandeepanchakraborty/Form-Builder-Typescript-/issues)

---

## 🚀 Overview

**Form Builder Typescript** is a robust, flexible, and extensible form builder library written in TypeScript. It empowers developers to create complex, dynamic, and fully customizable forms using a simple, declarative API. Whether you are building a simple login form or a multi-step survey, this library provides you the tools to do it efficiently.

---

## 📸 Screenshot

> _Paste your screenshot(s) here!_
>
> ![Form Builder Screenshot](screenshot.png)
>
> _Tip: To add a screenshot, save it as `screenshot.png` in the root or update the filename above._

---

## ✨ Features

- **TypeScript First**: 100% written in TypeScript, with full type safety.
- **Declarative API**: Define forms and fields in JSON or TS objects.
- **Custom Components**: Plug in your own input or form field components.
- **Validation**: Built-in and custom validation rules (sync/async).
- **Conditional Logic**: Show/hide fields, enable/disable dynamically based on form state.
- **Layouts**: Grid, column, tabbed, collapsible sections, etc.
- **Field Types**: Input, select, radio, checkbox, date, file, custom, etc.
- **Dynamic Forms**: Add/remove fields and sections at runtime.
- **Form Actions**: Submit, reset, preview, save as draft, etc.
- **Accessibility**: ARIA-friendly and keyboard navigation support.
- **Theming**: Easily style with CSS, SCSS, or CSS-in-JS libraries.
- **Integration Friendly**: Works with React, Angular, Vue, and Vanilla JS.

---

## 🏗️ Installation

```bash
npm install @your-org/form-builder-typescript
# or
yarn add @your-org/form-builder-typescript
```

---

## 🛠️ Usage

### 1. Basic Example

```typescript
import { FormBuilder, FieldTypes, Validators } from '@your-org/form-builder-typescript';

const formSchema = {
  fields: [
    {
      name: 'username',
      label: 'Username',
      type: FieldTypes.Text,
      validators: [Validators.required, Validators.minLength(3)],
    },
    {
      name: 'email',
      label: 'Email',
      type: FieldTypes.Email,
      validators: [Validators.required, Validators.email],
    },
    {
      name: 'password',
      label: 'Password',
      type: FieldTypes.Password,
      validators: [Validators.required, Validators.minLength(6)],
    },
  ],
  onSubmit: (values) => {
    console.log('Form Submitted:', values);
  },
};

<FormBuilder schema={formSchema} />;
```

### 2. Field Types

- Text
- Number
- Email
- Password
- Select
- Radio
- Checkbox
- DatePicker
- FileUpload
- CustomComponent

### 3. Validation

Supports both synchronous and asynchronous validation.
```typescript
validators: [
  Validators.required,
  Validators.minLength(3),
  async (value) => await checkUsernameUnique(value)
]
```

### 4. Conditional Fields

```typescript
{
  name: 'company',
  type: FieldTypes.Text,
  visible: (values) => values.accountType === 'business',
}
```

### 5. Custom Components

Plug in your own React/Vue/Angular components:

```typescript
{
  name: 'profilePicture',
  type: FieldTypes.Custom,
  component: CustomImageUploader,
}
```

---

## 🧩 API Reference

### FormBuilder Props

| Prop      | Type     | Required | Description |
|-----------|----------|----------|-------------|
| `schema`  | `object` | Yes      | The form schema definition |
| `initialValues` | `object` | No | Initial field values |
| `onSubmit` | `function` | Yes | Submit handler |
| `onChange` | `function` | No | Called on any field change |
| `theme` | `object` | No | Custom theme/styles |

### Schema Example

See [example/schema.ts](example/schema.ts) for a full example.

---

## 🧪 Testing

```bash
npm test
```

- Uses **Jest** for unit tests and **React Testing Library** (if React integration).
- Test coverage reports generated in `/coverage`.

---

## 📦 Build

```bash
npm run build
```

- Outputs to the `dist/` directory.
- Generates type definitions.

---

## 📝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a branch: `git checkout -b feature-new`
3. Commit your changes: `git commit -m 'Add cool feature'`
4. Push to your branch: `git push origin feature-new`
5. Open a Pull Request.

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for full guidelines.

---

## 🗣️ Community

- [GitHub Discussions](https://github.com/sandeepanchakraborty/Form-Builder-Typescript-/discussions)
- [Issues](https://github.com/sandeepanchakraborty/Form-Builder-Typescript-/issues)

---

## 💡 FAQ

**Q: Can I use this with React/Vue/Angular?**  
A: Yes! The core is framework-agnostic. Adapters available for React, Vue, Angular, or use vanilla JS.

**Q: How do I add custom validation?**  
A: Pass your custom validation function in the field's `validators` array.

**Q: Is it production-ready?**  
A: Yes, but we recommend thorough testing for your use-case.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- Inspired by popular form libraries like Formik, React Hook Form, and Angular Formly.
- Thanks to all contributors and users!

---

## 📂 Project Structure

```
Form-Builder-Typescript-/
│
├── src/                # Main library source code
│   ├── components/     # UI components
│   ├── core/           # Core logic and types
│   └── utils/          # Helpers/utilities
│
├── example/            # Example usage and demo apps
├── tests/              # Unit and integration tests
├── dist/               # Compiled outputs (after build)
├── README.md           # This file
├── package.json        # NPM package
└── tsconfig.json       # TypeScript configuration
```

---

## 📬 Contact

For questions, reach out via [GitHub Issues](https://github.com/sandeepanchakraborty/Form-Builder-Typescript-/issues) or email: [your.email@domain.com](mailto:sandeepanchakraborty123@gmail.com)

---

> _Happy Form Building!_
