# Architecture

## Overview
- Express API with modular routes
- Swagger UI for API documentation
- Config-driven port and secrets

## Data flow
HTTP request -> Express routes -> JSON response

## Key decisions
- Keep the service stateless
- Centralize config in `.env`
