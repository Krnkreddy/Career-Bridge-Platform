
# Phase 2: Intelligence & Growth

## 1. AI-Powered Matching Engine
**Goal**: Automatically rank candidates for a job based on skills and experience.

### Architecture
1.  **Resume Parsing Service**:
    *   Input: PDF URL (from Uploadthing or S3).
    *   Process: Send text to OpenAI `gpt-4o` to extract structured JSON (Skills, Experience Years, Education).
    *   Storage: Save to `Profile` model (JSONB).
2.  **Vector Embeddings**:
    *   Job Description -> Vector (via OpenAI `text-embedding-3-small`).
    *   Candidate Profile -> Vector.
    *   Storage: Pinecone or Pgvector (Neon supports this).
3.  **Matching API**:
    *   `GET /jobs/:id/matches`: Returns sorted list of applicants by cosine similarity.

## 2. Infrastructure Scaling
**Goal**: Support 10k+ concurrent users and real-time features.

### Caching Strategy
1.  **Redis (Upstash)**:
    *   Cache `GET /jobs` results (TTL 5 mins).
    *   Session store for high-volume auth checks (if needed beyond Clerk).
2.  **Socket.IO Adapters**:
    *   Use Redis Adapter to allow scaling API to multiple instances/containers on Railway.

## 3. Analytics Dashboard
**Goal**: Provide insights to Recruiters.

### Metrics
1.  **Funnel**: Views -> Applications -> Interviews -> Offers.
2.  **Time to Hire**: Average days from Post to Offer.
3.  **Implementation**:
    *   New `AnalyticsService`.
    *   Table `Events` (PostgreSQL) or Tinybird (for high volume).

## 4. Work Breakdown
*   [ ] Integrate OpenAI API for Resume Parsing.
*   [ ] Enable `pgvector` on Neon DB.
*   [ ] Implement Resume Upload (Uploadthing).
*   [ ] Build "Recommended Candidates" UI for Recruiters.
