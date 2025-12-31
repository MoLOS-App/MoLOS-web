---
title: "Health Module"
description: "Health and wellness tracking system - comprehensive health metrics and wellness management"
---

# Health Module

The Health module provides comprehensive health and wellness tracking capabilities. This is the main health module that works alongside the Health Tracker for complete wellness management.

##  Overview

**Location:** `/health`

This module provides:
- Health metrics tracking
- Wellness monitoring
- Integration with Health Tracker
- Comprehensive health dashboard

## ️ Module Structure

```
/health/
├── activities/              # Activity tracking
├── dashboard/               # Health overview
├── goals/                   # Health goals
├── measurements/            # Body measurements
├── settings/                # Configuration
├── weight/                  # Weight tracking
├── +layout.svelte
├── +layout.server.ts
└── +page.svelte
```

##  Integration

- **Health Tracker**: Detailed activity and measurement tracking
- **Goals Module**: Health-specific objectives
- **Meals Module**: Nutrition and wellness correlation
- **Dashboard**: Health metrics overview

---

*See [Health Tracker](/docs/modules/health) for detailed documentation.*