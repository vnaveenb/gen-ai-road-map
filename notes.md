# GenAI Engineer Roadmap (2026)

## Implementation Status
- Content library initialized at [library/_meta/index.md](library/_meta/index.md).
- Phase A implemented with:
  - explainer files across C1 to C6
  - interview question files across C1 to C6
  - template and metadata system for scalable authoring
- Deep-upgrade wave completed across C1-C6:
  - advanced explainers completed across C1-C6
  - interview packs upgraded with layered answers, decision trees, and flowcharts across C1-C6

## Program Context
- Target profile: software engineer with around 5 years experience.
- Existing strength: cloud and platform engineering (GKE and GitHub Actions).
- Goal: balanced interview readiness plus job-ready portfolio.
- Timeline: 12-16 weeks.
- Weekly effort: 10-12 hours.
- Stack bias: open-source first, cloud-integrated when needed.

## How To Use This Document
- Follow the weekly plan in order. Do not skip phase gates.
- Build artifacts every week; no theory-only weeks.
- Track progress using the KPI dashboard section.
- Use the platform module schema section to convert this roadmap into a customized learning platform later.

## Core Principles
1. Learn by building, not by collecting links.
2. Keep model behavior measurable with evals from week 9 onward.
3. Prefer simple workflows first, then agents when complexity is justified.
4. Treat latency, cost, and reliability as first-class requirements.
5. Convert every learning module into interview language and production language.

## Weekly Time Split (10-12 Hours)
- 3h theory and paper reading.
- 5h implementation and experiments.
- 2h interview practice (DSA or system design).
- 1h retrospective, note cleanup, and planning.

## Open-Source First Tool Stack
- Language and runtime: Python 3.11+.
- Core ML and LLM: PyTorch, Hugging Face Transformers, Datasets, PEFT, bitsandbytes.
- Retrieval and vector search: FAISS first, then Qdrant or Milvus.
- LLM app layer: plain SDK and FastAPI first, then LlamaIndex or LangChain when needed.
- Serving: vLLM (primary), optional TGI.
- Observability: OpenTelemetry, Prometheus, Grafana, structured logs.
- Eval and quality: custom eval sets, RAG quality checks, regression tests.
- Deployment: Docker, GKE, GitHub Actions.

## Competency Map

### C1. Python and DSA for AI Systems
Must have:
- Python typing, async, packaging, testing, profiling.
- Hash maps, heaps, sliding windows, graphs, cache design patterns.
- Complexity analysis under interview pressure.

### C2. ML and DL Fundamentals
Must have:
- Linear algebra intuition for attention and embeddings.
- Gradients and optimization basics.
- Overfitting and evaluation basics.

### C3. Transformers and LLM Internals
Must have:
- Self-attention, multi-head attention, positional encoding.
- Tokenization behavior and context window tradeoffs.
- Decoder-only vs encoder-only vs encoder-decoder.

### C4. Adaptation and Retrieval
Must have:
- Prompting vs fine-tuning decision framework.
- LoRA and QLoRA practical setup.
- RAG pipeline design and retrieval quality tuning.

### C5. Agents, Evals, and Guardrails
Must have:
- Workflow vs agent architecture choices.
- Tool calling design and failure handling.
- Evaluation datasets and automated regression checks.

### C6. Production GenAI Engineering
Must have:
- Serving and optimization (batching, caching, quantization basics).
- Monitoring and rollback strategy.
- Cost and latency optimization with explicit SLOs.

## Phase Gates
- Gate 1 (end of week 4): strong Python refresh + medium DSA confidence + ML basics recovered.
- Gate 2 (end of week 8): can explain and implement core transformer concepts, embeddings, and PEFT basics.
- Gate 3 (end of week 12): working RAG system with evaluation evidence and reliability controls.
- Gate 4 (end of week 16): deployed production-style capstone + interview packet + mock performance evidence.

---

## 16-Week Execution Plan

## Phase 1: Foundations and ML Core (Weeks 1-4)

### Week 1 - Python Systems Refresh + DSA Core I
Objectives:
- Rebuild high-leverage Python for AI engineering.
- Rebuild speed on array and hash map DSA patterns.

Study:
- Python: typing, dataclasses, iterators, generators, context managers, async basics.
- DSA: arrays, hash maps, two pointers, prefix sums.

Build:
- Utility package with typed data models and validation.
- Solve 8-10 medium DSA problems from selected patterns.

Interview drills:
- Explain time/space complexity for each solution.
- Whiteboard one hash-map design pattern.

Deliverables:
- One Python utils repo.
- One solved problem notebook or markdown log.

Exit criteria:
- Can solve medium array/hash questions in 25-35 minutes.

### Week 2 - DSA Core II + Concurrency and Caching Basics
Objectives:
- Improve DSA patterns relevant to system design.
- Learn practical concurrency and caching in Python.

Study:
- DSA: heap, stack/queue, sliding window, linked list patterns.
- Systems: thread safety basics, async IO patterns, cache eviction policies (LRU and LFU).

Build:
- Implement thread-safe in-memory cache.
- Solve 8-10 medium DSA problems from heap/sliding window/cache topics.

Interview drills:
- Design hit counter and rate limiter sketch.
- Explain O(1) guarantees in LRU cache.

Deliverables:
- Cache implementation with tests.
- DSA performance tracking sheet.

Exit criteria:
- Can defend complexity tradeoffs and edge cases quickly.

### Week 3 - Math and ML Refresher for LLM Work
Objectives:
- Refresh only the math needed for transformer and embedding intuition.
- Rebuild basic ML evaluation instincts.

Study:
- Linear algebra: matrix multiplication, dot products, norms, projection intuition.
- Probability and stats: distributions, bias/variance, confidence and calibration basics.
- ML: train/validation/test split, leakage, precision/recall/F1.

Build:
- Numpy notebook: implement linear algebra operations and cosine similarity.
- Small classification baseline with clear train/eval split.

Interview drills:
- Explain why cosine similarity is used for embeddings.
- Explain precision/recall tradeoff with use-case examples.

Deliverables:
- Math refresh notebook with visual explanations.
- ML baseline report with metric interpretation.

Exit criteria:
- Can explain embedding similarity and metrics without memorized scripts.

### Week 4 - Deep Learning Foundations and PyTorch Fluency
Objectives:
- Build reliable PyTorch fundamentals.
- Prepare for attention and transformers.

Study:
- Neural nets, activations, backprop intuition, optimizer behavior.
- Regularization and failure modes.

Build:
- Train an MLP and one CNN baseline with clean training loop and logging.
- Add early stopping, checkpointing, and metric tracking.

Interview drills:
- Explain vanishing gradients and mitigation.
- Explain why validation metrics diverge from training metrics.

Deliverables:
- DL training template repo.
- Experiment summary with failure analysis.

Exit criteria:
- Can build, train, and debug DL training loops without copy-paste dependence.

---

## Phase 2: Transformers, Adaptation, and Retrieval Fundamentals (Weeks 5-8)

### Week 5 - Sequence Modeling to Attention Transition
Objectives:
- Understand why attention replaced recurrent-heavy pipelines for many tasks.

Study:
- Sequence modeling limitations.
- Scaled dot-product attention and multi-head intuition.

Build:
- Numpy or PyTorch notebook implementing basic self-attention.
- Visualize attention weights on toy inputs.

Interview drills:
- Explain why attention is parallel-friendly.
- Compare recurrent sequence bottlenecks vs transformer behavior.

Deliverables:
- Attention notebook with tensor shape walkthrough.

Exit criteria:
- Can derive attention computation pipeline and explain each tensor operation.

### Week 6 - Transformer Internals and Tokenization
Objectives:
- Master architecture-level understanding for interviews and debugging.

Study:
- Encoder, decoder, residual blocks, layer normalization.
- Tokenization (BPE/WordPiece intuition), context window constraints.

Build:
- Minimal transformer block implementation walkthrough.
- Tokenization diagnostics script comparing token counts across prompts.

Interview drills:
- Explain context window failure scenarios.
- Explain model architecture choice by use case.

Deliverables:
- Transformer internals notes and token budget calculator.

Exit criteria:
- Can explain sequence length/cost/latency implications clearly.

### Week 7 - Fine-Tuning Strategy and PEFT (LoRA/QLoRA)
Objectives:
- Choose between prompt engineering, RAG, and fine-tuning with clear logic.
- Learn practical PEFT stack.

Study:
- Fine-tuning lifecycle.
- LoRA assumptions and rank tradeoffs.
- QLoRA memory and speed benefits.

Build:
- One LoRA fine-tuning mini experiment on a narrow task.
- Compare baseline prompt-only vs LoRA-adapted output quality.

Interview drills:
- When not to fine-tune.
- How to justify LoRA in production.

Deliverables:
- PEFT experiment report with memory, quality, and cost notes.

Exit criteria:
- Can defend adaptation strategy with evidence, not preference.

### Week 8 - Embeddings and Vector Search Foundations
Objectives:
- Build solid retrieval fundamentals before full RAG.

Study:
- Embedding model selection basics.
- Dense vs lexical vs hybrid search concepts.
- ANN basics and metadata filtering.

Build:
- Local semantic search app using FAISS.
- Add metadata filters and retrieval quality checks.

Interview drills:
- Explain dense retrieval failure modes.
- Explain why hybrid search often improves enterprise use cases.

Deliverables:
- Retrieval baseline service with top-k diagnostics.

Exit criteria:
- Can troubleshoot poor retrieval quality with a structured checklist.

---

## Phase 3: RAG, Agents, and Evals (Weeks 9-12)

### Week 9 - RAG v1 (Ingestion to Generation)
Objectives:
- Build first full RAG pipeline end to end.

Study:
- Ingestion -> chunking -> embedding -> index -> retrieval -> augmentation -> generation.
- Source citation patterns.

Build:
- RAG API with document ingestion and answer citations.
- Prompt template enforcing grounded answers.

Interview drills:
- Explain chunking tradeoffs and failure modes.
- Explain retrieval top-k and prompt context tradeoff.

Deliverables:
- RAG v1 service with API docs.

Exit criteria:
- Produces citation-backed answers on a private corpus.

### Week 10 - RAG Optimization and Retrieval Quality
Objectives:
- Improve retrieval and answer faithfulness systematically.

Study:
- Chunk size and overlap tuning.
- Hybrid search and reranking.
- Metadata-aware retrieval.

Build:
- A/B test retrieval strategies.
- Add reranker and compare quality metrics.

Interview drills:
- Explain why one retrieval strategy failed and how you fixed it.
- Explain quality metrics for retrieval and generation.

Deliverables:
- RAG optimization report with before/after metrics.

Exit criteria:
- Measurable improvement in retrieval precision and answer faithfulness.

### Week 11 - Workflows, Agents, and Tool Calling
Objectives:
- Build reliable tool-using LLM workflows.
- Avoid over-engineering autonomous agents too early.

Study:
- Workflow patterns: chaining, routing, evaluator loops.
- Agents vs workflows decision framework.
- Tool schema and argument validation.

Build:
- Workflow-based assistant with 2-3 tools.
- Optional: bounded-loop agent with max-iteration guard.

Interview drills:
- Defend workflow choice over full autonomous agent.
- Explain tool misuse prevention strategy.

Deliverables:
- Tool-calling workflow demo with logs.

Exit criteria:
- Robust behavior on happy path and common failure path.

### Week 12 - Evals, Guardrails, and Reliability Engineering
Objectives:
- Make LLM quality measurable and regression-proof.

Study:
- Eval set design and grader logic.
- Prompt injection basics, data leakage risks, refusal and fallback design.
- Reliability patterns: retry budgets, timeout policy, circuit breakers.

Build:
- Eval suite for key prompts and tasks.
- Guardrail checks for input and output policy controls.

Interview drills:
- Explain your eval lifecycle from baseline to regression protection.
- Explain security controls in RAG and tool-calling systems.

Deliverables:
- Versioned eval dataset and report.
- Guardrail policy checklist.

Exit criteria:
- Can demonstrate measurable quality and safety improvements over baseline.

---

## Phase 4: Production, System Design, and Interview Readiness (Weeks 13-16)

### Week 13 - Serving and Inference Optimization
Objectives:
- Learn practical serving behavior and performance tuning.

Study:
- vLLM serving concepts.
- Batching, prefix caching, KV cache basics, quantization options.
- Throughput vs latency tradeoffs.

Build:
- Benchmark two model serving setups.
- Add performance test scripts and dashboard metrics.

Interview drills:
- Explain p95 latency bottleneck diagnosis.
- Explain cost-quality-latency tradeoff recommendations.

Deliverables:
- Serving benchmark report with tuning decisions.

Exit criteria:
- Clear tuning story with reproducible benchmark steps.

### Week 14 - Productionization on GKE + GitHub Actions
Objectives:
- Use your cloud strength for production-grade deployment.

Study:
- Container hardening basics.
- CI/CD gates for LLM systems.
- Observability and rollback playbooks.

Build:
- Deploy RAG/workflow service on GKE.
- Add GitHub Actions pipeline with tests, eval gate, and deployment gate.
- Add metrics, structured logs, alerts.

Interview drills:
- Explain deployment and rollback strategy.
- Explain how you prevented prompt regressions in CI.

Deliverables:
- Live deployment plus architecture diagram.
- CI/CD workflow files and run history evidence.

Exit criteria:
- Production-like deployment with health checks and rollback path.

### Week 15 - GenAI System Design and DSA Interview Integration
Objectives:
- Convert technical depth into interview-ready system design responses.

Study:
- LLM-centric system design patterns.
- Data modeling and API contracts.
- Failure-mode-first architecture communication.

Build:
- Design docs for:
  - URL shortener + abuse controls.
  - Rate limiter at gateway scale.
  - RAG assistant for enterprise docs.
  - Notification/queue pipeline with idempotency.

Interview drills:
- 3 timed mock system design rounds.
- 2 timed coding rounds.

Deliverables:
- Design packet with tradeoff matrix.

Exit criteria:
- Can structure and defend architecture in 30-45 minute interview format.

### Week 16 - Capstone Hardening and Interview Sprint
Objectives:
- Consolidate all evidence into a hiring-ready profile.

Study:
- Review weak areas from mocks.
- Rehearse role-specific stories.

Build:
- Final capstone polish:
  - reliability fixes
  - observability polish
  - security hardening
  - performance tuning
- Publish concise technical writeup.

Interview drills:
- 4 mock interviews (coding, system design, ML/LLM deep dive, behavioral).

Deliverables:
- Final capstone demo and architecture writeup.
- Interview prep packet (resume bullets, project stories, Q/A notes).

Exit criteria:
- Ready for applications and interview loops.

---

## Portfolio Projects (Must Build)

### Project 1 - Semantic Retrieval Baseline
Timeline: weeks 7-8
- Problem: searchable private corpus.
- Stack: Python, FAISS, embedding model, FastAPI.
- Must-have metrics: top-k precision and retrieval latency.

### Project 2 - RAG Assistant (Production-Oriented)
Timeline: weeks 9-12
- Problem: grounded question answering with citations.
- Stack: LLM API or open model, vector DB, reranker, eval suite.
- Must-have metrics: faithfulness, answer relevance, p95 latency.

### Project 3 - Tool-Calling Workflow Assistant
Timeline: weeks 11-13
- Problem: multi-step tasks with external tools.
- Stack: workflow orchestration, tool schema, validation, guardrails.
- Must-have metrics: task completion rate, tool error rate.

### Project 4 - Deployed Capstone on GKE
Timeline: weeks 13-16
- Problem: production-grade GenAI service with CI/CD.
- Stack: Docker, GKE, GitHub Actions, observability stack.
- Must-have metrics: uptime, deploy success rate, rollback recovery time.

---

## Interview Track

## A) DSA to System Design Mapping (High Priority)
| DSA Pattern | Typical Problem | System Design Relevance | Follow-up Angle |
|---|---|---|---|
| Heap / Top-K | Top K frequent | trends and ranking systems | streaming data and bounded memory |
| Sliding window | max window | metrics windows and rate controls | monotonic queue optimization |
| Hash map | two sum style lookups | dedupe and idempotency keys | collision strategy and memory pressure |
| LRU/LFU | cache design | CDN and app cache policies | thread safety and sharding |
| Graph + topo sort | course schedule | workflow dependency orchestration | cycle handling and retries |
| Union find | connected components | cluster health and service grouping | dynamic merges and partitions |

## B) GenAI System Design Prompts
- Design a grounded enterprise assistant with strict citation requirements.
- Design an AI API gateway with model routing and fallback logic.
- Design a multi-tenant RAG platform with isolation and access controls.
- Design a tool-calling assistant with auditable action logs.
- Design an eval and rollback system for prompt and model changes.

## C) Core Deep-Dive Questions
- Why attention scales better than recurrent-heavy sequence processing?
- When should you use prompt engineering, RAG, LoRA, or full fine-tuning?
- How do tokenization choices hurt production quality?
- How do you measure hallucination mitigation objectively?
- How do you control latency and cost in production?

---

## KPI Dashboard (Track Weekly)

Quality:
- Retrieval precision@k.
- Answer faithfulness score.
- Task success rate.

Performance:
- p50 and p95 latency.
- Throughput at fixed concurrency.
- Token usage per request.

Reliability:
- Error rate by endpoint.
- Tool failure rate.
- Regression count in eval suite.

Cost:
- Cost per 1k requests.
- Cost per successful task.
- Infra spend trend.

Interview readiness:
- DSA timed solve rate.
- Mock interview score.
- System design clarity score.

---

## Paper Reading Ladder (Priority Order)

Read in this order and capture practical notes:
1. Attention Is All You Need
- Extract: architecture decisions, complexity implications, and why it changed the field.
2. Language Models are Few-Shot Learners
- Extract: in-context behavior and scaling insight.
3. LoRA: Low-Rank Adaptation of Large Language Models
- Extract: adaptation efficiency and deployment implications.
4. Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks
- Extract: retrieval/generation coupling and knowledge freshness strategy.
5. InstructGPT / RLHF style alignment work
- Extract: alignment pipeline and risks.
6. One serving optimization paper (for example, vLLM/PagedAttention references)
- Extract: throughput and memory management implications for production.

For each paper, write:
- 5 key ideas.
- 3 production implications.
- 3 interview questions and answers.

---

## Platform-Ready Module Schema (For Customized Learning Platform)

Use this schema for each module in future splitting.

```yaml
module_id: llm-rag-hybrid-search
phase: phase-3
week: 10
title: Hybrid Retrieval and Reranking
difficulty: 3
estimated_hours: 8
prerequisites:
  - embeddings-basics
  - rag-v1
interview_frequency: 8
learning_objectives:
  - improve retrieval precision under domain-specific vocabulary
  - compare dense-only vs hybrid retrieval
core_theory:
  - dense retrieval
  - lexical retrieval
  - reranking
hands_on_labs:
  - implement hybrid retrieval
  - add reranker and compare metrics
assessment:
  quiz_questions: 8
  coding_tasks: 2
  pass_threshold: 75
deliverables:
  - experiment_report.md
  - benchmark_results.csv
tags:
  - rag
  - retrieval
  - evaluation
updated_on: 2026-04-05
```

## Progression Rules (Adaptive)
- If quiz >= 80 and lab passes, unlock next module.
- If quiz 60-79, assign one remedial micro-module plus re-test.
- If quiz < 60, force prerequisite recap and mentor review.
- If project KPI fails, block progression until root-cause report is submitted.

---

## Weekly Review Template
- What worked this week?
- What failed and why?
- Which KPI moved in the wrong direction?
- What is next week risk?
- Which 2 interview stories became stronger?

---

## Build Backlog (After Week 16)

Tier 1 (high ROI):
- AI gateway with model routing and fallback.
- Prompt and response caching layer.
- Structured output parser with schema validation.

Tier 2 (advanced):
- Graph RAG on internal docs.
- Multi-agent planner with evaluator loop.
- Distillation pipeline for low-cost inference.

Tier 3 (specialized):
- Quantization experiments beyond baseline.
- Speculative decoding experiments.
- Multimodal retrieval and reasoning.

---

## Common Failure Modes and Fixes
- Symptom: good demo, bad production reliability.
  - Fix: add eval suite and regression gate before deployment.
- Symptom: high hallucination despite RAG.
  - Fix: audit retrieval first, then prompt constraints, then reranking.
- Symptom: latency too high at concurrency.
  - Fix: profile serving path, add batching/prefix caching, tune model size.
- Symptom: agent loops or invalid tool calls.
  - Fix: strict tool schema, max iteration guard, fallback workflow path.
- Symptom: interview answers feel shallow.
  - Fix: tie every concept to your own project metrics and tradeoffs.

---

## Final Output Checklist (End of Program)
- 1 production-style deployed GenAI service.
- 3-4 polished projects with measurable results.
- system design packet with at least 5 designs.
- DSA confidence log with timed medium solves.
- paper notes with production implications.
- interview packet with project stories and deep-dive Q/A.

If all items above are complete, you are ready to apply and interview for GenAI Engineer roles with strong practical evidence.
