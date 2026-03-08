# ProjetoLivros

# Catálogo de Livros – Projeto Angular

## Autor

Mafalda Moura

## Descrição do Projeto

Este projeto foi desenvolvido no âmbito da UC de Programação em JavaScript. 
O que se pretende com o mesmo, era a criação de uma app que permitisse analisar o detalhe de livros lidos, por ler e a ler. 

Com isto, a aplicação permite adicionar, visualizar, editar e remover os livros bem como possui cerca de 3 filtros: visualizar os livros lidos, a ler e por ler, bem como o rating dos mesmos [ de 0 a 5]. 

O objetivo do projeto era demonstrar como se utiliza **Angular, TypeScript, componentes, serviçis, routing e Reactive Forms**, seguindo todo o conhecimento aprendido ao longo da unidade curricular (desde HTML, CSS, JavaScript, TypeScript e Angular)

---

## Funcionalidades

### Dashboard

* Apresenta **KPIs do catálogo de livros**
* Total de livros
* Total de livros lidos
* Percentagem de livros Lidos 

### Lista de Livros
* Visualização de todos os livros
* **Filtro por estado**
  * Todos
  * Por ler
  * A ler
  

* **Ordenação**

  * Título A-Z
  * Título Z-A
  * Rating maior → menor
  * Rating menor → maior

### Detalhe do Livro

* Visualização completa das informações de um livro
* Possibilidade de **editar os dados**

### Formulário de Livros
* Criação de novos livros
* Validação com **Reactive Forms**
* Campos obrigatórios:

  * Título
  * Autor
  * Género
* Rating disponível apenas quando o livro está marcado como **lido**

### Outras Funcionalidades

* **Pipe personalizado** para formatar o estado do livro
* **Service** para gestão dos dados
* Persistência de dados através de **LocalStorage**
* Navegação com **Angular Router**

---

## Tecnologias Utilizadas

* Angular
* TypeScript
* HTML
* CSS

---

## Como executar o projeto

1. Instalar dependências:

```bash
npm install
```

2. Iniciar o servidor de desenvolvimento:

```bash
ng serve
```

3. Abrir no navegador:

```
http://localhost:4200
```

---

## Estrutura do Projeto

```
src/
 ├─ app/
 │   ├─ dashboard/
 │   ├─ features/
 │   │   ├─ books/
 │   │   │   ├─ book-list
 │   │   │   ├─ book-detail
 │   │   │   ├─ book-form
 │   │   │   └─ book.service
 │   ├─ models/
 │   │   └─ book.ts
 │   └─ shared/
 │       └─ pipes/
 │           └─ status-label.pipe
```

---

## Conclusão

Este projeto demonstra a criação de uma **Single Page Application (SPA)** com Angular, utilizando componentes reutilizáveis, serviços para gestão de dados, formulários reativos e boas práticas de desenvolvimento frontend.

--------

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
# projeto_final_livros
