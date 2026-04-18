# Solution Advisor Agent Guide

## Scope
This file governs work under `components/solution-advisor/` and related advisor files (catalog, rules, recommendation engine, and advisor page wiring).

Use this guide together with root `AGENTS.md`.

## Mission
Build a premium, production-oriented POSTO Tech Interactive Solution Advisor that:
- captures client room requirements through a guided flow
- returns deterministic equipment recommendations
- explains why each recommendation is included
- visualizes room layout and device placement
- drives consultation/quotation conversion

## MVP Deliverables
1. Multi-step questionnaire with conditional logic
2. Rules-based recommendation engine (deterministic, explainable)
3. Result view with solution summary and bundle cards
4. Visual room layout with clear device zones
5. Interactive hotspots with device role explanations
6. Strong CTA for consultation/proposal

## Non-Negotiables
- Premium, clear, consultative UX (no clutter)
- No random recommendations
- No technical overwhelm for non-technical buyers
- Recommendation logic must be auditable
- Keep architecture extensible for future catalog/pricing/CRM phases

## Architecture Expectations
Prefer separation of concerns:
- UI flow and rendering
- rules and decision logic
- product catalog data
- explanatory copy mapping

Suggested files:
- `components/solution-advisor/*`
- `catalog/products.json`
- `catalog/rules.json`
- `lib/recommendation-engine.(js|ts)`
- advisor route/page integration

## Logic Principles
Rules should be deterministic and easy to inspect. Examples:
- larger room -> larger display + broader audio
- higher attendees -> stronger mic/speaker coverage
- hybrid required -> conferencing camera + microphone package
- classroom + writing panels -> smart e-blackboard + side panels
- recording required -> lecture capture tools
- presenter tracking required -> AI tracking camera
- wireless requested -> wireless presentation module

## UX Rules
- Keep steps short, readable, and progressive
- Use plain language in questions/results
- Result page should feel like a mini professional proposal
- Every recommended item needs a "what" + "why"
- Visual room diagram should explain, not decorate

## Data Model Guidance
Product objects should be structured and replaceable later.
Recommended fields:
- `id`, `name`, `category`, `tier`
- `supported_room_types`, `supported_platforms`
- `ideal_room_size_range`, `ideal_attendee_range`
- `features`, `benefits`, `optional_accessories`

## Quality Bar
Before completion, verify:
- recommendation quality and consistency
- clarity of explanations
- hotspot usability
- mobile readability
- maintainable file boundaries

## Out of Scope (MVP)
- e-commerce checkout
- real-time final pricing
- CAD-level planning / full 3D rendering
- full CRM automation

## Decision Priority
1. business usefulness
2. client clarity
3. recommendation correctness
4. premium presentation
5. maintainability
6. speed

## Final Standard
Treat this as a consultative digital sales assistant, not a generic widget.
