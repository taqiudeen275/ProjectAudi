# AI Model Strategy, Licensing, Deployment, and Evaluation

**Status:** Approved pre-build baseline

**Research date:** 2026-08-03

**Owners:** AI Platform, Product, Trust & Safety, Legal/Commercial

## 1. Purpose

This document defines which speech, sound, transcription, and helper-language models AudiLink intends to ship in V1; how they are exposed through a common adapter layer; and the license, quality, safety, cost, and deployment gates every exact checkpoint must pass.

Model marketing claims are not production approval. An engine is production-approved only when its exact weight revision, source code revision, container digest, transitive licenses, benchmark report, billing multiplier, and safety controls are recorded in the AudiLink model registry.

## 2. Decisions

- AudiLink will integrate every current engine family exposed by the open-source [Voicebox studio](https://github.com/jamiepine/voicebox), plus Fish S2-Pro.
- “Voicebox” in this project means Jamie Pine's open-source application, not Meta's unrelated Voicebox research model.
- Fish Speech is not currently a Voicebox backend. It requires a first-party AudiLink adapter.
- Voicebox audio effects are DSP post-processing, not text-to-sound generation. AudiLink uses MOSS-SoundEffect-v2 for generated effects and FFmpeg/Pedalboard-style processing for deterministic effects.
- Open-weight models run from AudiLink-controlled, pinned containers on managed compute. Hosted providers may be attached through the same contract where licensing, cost, or capacity makes that preferable.
- The default UI offers **Fast**, **Balanced**, and **Studio** modes. **Advanced** reveals the exact engine and only settings supported by that engine.
- English is GA. Other languages remain Beta until the exact model/language pair passes the same evaluation suite.
- User manuscripts, recordings, prompts, and outputs are not used for training unless the user enters a separate, explicit, revocable opt-in program.

## 3. Capability taxonomy

The registry uses capabilities rather than assuming that all TTS models behave alike:

| Capability | Meaning |
|---|---|
| Preset TTS | Synthesis with model-supplied voices |
| Voice clone | Synthesis conditioned on authorized reference audio |
| Voice design | Creation of a synthetic voice from a textual description |
| Instruction control | Natural-language control over delivery |
| Inline tags | Model-native laughter, whisper, breath, pause, or other event tags |
| Multi-speaker | More than one speaker represented natively in one model request |
| Long-form | Qualified for chapter-scale continuity rather than isolated clips |
| Streaming | Delivers usable audio before the entire response finishes |
| SFX generation | Produces non-speech audio from a prompt |
| Transcription/alignment | Converts audio to text and/or word timestamps |
| Text helper | Constrained parsing, metadata, cleanup, and suggestions |

Audiobook projects remain block- and clip-based even when an engine supports native multi-speaker generation. This preserves line-level editing, deterministic retries, casting, billing, and provenance.

## 4. V1 model inventory

### 4.1 Voicebox engine families

| Engine/checkpoint family | Primary capability | Upstream scope | License baseline | V1 role and gate |
|---|---|---|---|---|
| [Qwen3-TTS 0.6B Base](https://huggingface.co/Qwen/Qwen3-TTS-12Hz-0.6B-Base) | Voice clone | Ten documented languages | Apache-2.0 | Fast/balanced multilingual cloning; full weight download and GPU benchmark required |
| [Qwen3-TTS 1.7B Base](https://huggingface.co/Qwen/Qwen3-TTS-12Hz-1.7B-Base) | Voice clone | Ten documented languages | Apache-2.0 | Studio-quality cloning and audiobook lines |
| [Qwen3-TTS 0.6B CustomVoice](https://huggingface.co/Qwen/Qwen3-TTS-12Hz-0.6B-CustomVoice) | Preset TTS, instruction control | Nine supplied speakers; ten languages | Apache-2.0 | Fast controlled preset speech |
| [Qwen3-TTS 1.7B CustomVoice](https://huggingface.co/Qwen/Qwen3-TTS-12Hz-1.7B-CustomVoice) | Preset TTS, instruction control | Nine supplied speakers; ten languages | Apache-2.0 | Higher-quality controlled preset speech |
| [LuxTTS](https://huggingface.co/YatharthS/LuxTTS) | English voice clone | English; lightweight 48 kHz pipeline | Apache-2.0 | Fast English previews and low-cost jobs |
| [Chatterbox Multilingual](https://github.com/resemble-ai/chatterbox) | Multilingual voice clone | 23-language family | MIT baseline | Balanced multilingual cloning; exact current checkpoint must be pinned |
| [Chatterbox Turbo](https://huggingface.co/ResembleAI/chatterbox-turbo) | English clone, inline tags | English; paralinguistic tags | MIT baseline | Expressive dialogue and tag-qualified lines |
| [TADA 1B](https://huggingface.co/HumeAI/tada-1b) | English clone/continuation | English | Llama 3.2 Community License | Long-form candidate; Llama notice and acceptable-use review required |
| [TADA 3B multilingual](https://huggingface.co/HumeAI/tada-3b-ml) | Multilingual clone/continuation | Multilingual release | Llama 3.2 Community License | Studio multilingual/long-form candidate; managed GPU only |
| [Kokoro 82M](https://huggingface.co/hexgrad/Kokoro-82M) | Preset TTS | Lightweight multilingual preset voices | Apache-2.0 | Lowest-cost previews, accessibility playback, and fallback |

The [Voicebox project status](https://github.com/jamiepine/voicebox/blob/main/docs/PROJECT_STATUS.md) is the compatibility reference, not the authority for model licensing. Every upstream model's own license controls.

### 4.2 Additional V1 models

| Model | Capability | License baseline | V1 role and gate |
|---|---|---|---|
| [Qwen3-TTS 1.7B VoiceDesign](https://huggingface.co/Qwen/Qwen3-TTS-12Hz-1.7B-VoiceDesign) | Text-described synthetic voice design | Apache-2.0 | Voice Lab design flow; generated reference can be cloned for consistent production |
| [Fish S2-Pro](https://huggingface.co/fishaudio/s2-pro) | Expressive clone, native multi-speaker, inline control, streaming | Fish Audio Research License | Required V1 adapter, but commercial production is hard-disabled until a signed commercial agreement exists |
| [MOSS-SoundEffect-v2.0](https://github.com/OpenMOSS/MOSS-TTS) | Text-to-SFX | Apache-2.0 | 48 kHz bilingual effect generation up to the upstream documented duration |
| [Whisper](https://github.com/openai/whisper) | Transcription and alignment input | MIT | Standalone transcription, manuscript/audio ingest, QA transcript, and alignment support |
| [Qwen3-0.6B](https://huggingface.co/Qwen/Qwen3-0.6B) | Small text helper | Apache-2.0 | Schema-constrained character/scene extraction, metadata, summaries, text normalization, and pronunciation suggestions |

Qwen3-0.6B must not make final copyright, consent, moderation, or payout decisions. It must not silently rewrite a manuscript. Every proposed edit is diffable, reversible, and attributable to a model revision.

## 5. Commercial and legal gates

### 5.1 General rule

For each engine, Legal/Commercial records:

1. Code license and weight license separately.
2. Required notices, attribution, acceptable-use terms, and redistribution limits.
3. Whether hosted SaaS inference is permitted.
4. Whether outputs may be used commercially and sublicensed into audiobooks.
5. Whether voice embeddings, prompts, or derived adapters may be stored.
6. Exact source URL, revision hash, review date, reviewer, and approval state.

“Open source,” “open weight,” or Voicebox compatibility is never treated as commercial permission.

### 5.2 Fish hard gate

The published [Fish Audio license](https://github.com/fishaudio/fish-speech/blob/main/LICENSE) permits research/non-commercial use without granting AudiLink's intended commercial SaaS use. Fish is therefore:

- allowed in isolated local evaluation;
- allowed through a hosted commercial API only under applicable paid terms;
- allowed in AudiLink-managed production only after a signed commercial self-host agreement;
- blocked from production routing, previews, publication, and billing until Legal records the agreement.

Because the approved V1 scope includes every engine, obtaining this agreement is a critical-path launch dependency.

### 5.3 TADA and other community licenses

TADA inherits Llama 3.2 Community License obligations. The release package must include required notices and attribution, and Legal must confirm that AudiLink's distribution and monthly-active-user profile remain within the license. Any later upstream license change triggers a new model version and review; it never silently changes an approved version.

## 6. Model registry

Each immutable model version records:

- AudiLink model ID and human label;
- upstream repository, exact revision, weight hashes, and container digest;
- engine family and adapter version;
- capability flags and incompatible controls;
- languages with GA/Beta/disabled state;
- sample rate, channels, output codecs, context and duration limits;
- required GPU architecture, minimum VRAM, CPU/RAM, precision, and warm-load time;
- interactive and batch eligibility;
- measured real-time factor, first-audio latency, failure rate, and cost;
- Studio Credit multiplier revision;
- code/weight licenses, approval, notices, and commercial restrictions;
- consent class, provenance support, watermark support, and safety limitations;
- golden-suite version and benchmark result;
- lifecycle state: discovered, evaluating, approved, degraded, disabled, or retired.

Moving tags such as “main” or “latest” are prohibited in production manifests.

## 7. Routing and product modes

### Fast

- Optimizes first-audio latency and cost.
- Candidates: Kokoro for preset voices, LuxTTS for English cloning, Qwen 0.6B where cloning/language requirements exclude those models.
- Must meet warm interactive real-time factor at or below 1.0 and the interactive queue SLO.

### Balanced

- Optimizes consistency and creator control.
- Candidates: Qwen 0.6B/1.7B, Chatterbox Multilingual/Turbo, and TADA 1B after qualification.
- May trade latency for stronger similarity, multilingual quality, or expression.

### Studio

- Optimizes final-publication quality.
- Candidates: Qwen 1.7B, TADA 3B, Fish S2-Pro after licensing, and the best benchmarked capability-specific model.
- Batch generation is allowed; the UI displays an estimate and does not imply real-time completion.

### Advanced

Advanced users select an exact approved model. Controls are generated from registry capabilities. Unsupported tags or parameters are rejected before credit reservation, not ignored or read aloud.

Routing is deterministic for a recorded request: selected mode, capability requirements, language, model-registry revision, and seed are stored with the job. A retry uses the same model unless the user explicitly accepts a fallback.

## 8. Adapter contract

Every inference adapter accepts a versioned request containing:

- job and idempotency IDs;
- exact model/revision and container;
- text or an immutable input-asset reference;
- voice version/reference asset and consent authorization reference;
- language, supported controls, seed, and requested output specification;
- safety/provenance context and distributed trace ID.

Every result returns:

- immutable object key and SHA-256;
- duration, sample rate, channels, codec, loudness, and peak;
- timestamps/alignment where available;
- model, adapter, container, and request revisions;
- actual metered units and GPU/runtime measurements;
- provenance/watermark state;
- warnings, safety findings, and structured failure code.

Adapters never receive raw wallet balances or decide billing. The control plane owns authorization, reservation, settlement, and refunds.

## 9. Managed deployment

- Package one model family per OCI image to isolate Python, CUDA, and codec conflicts.
- Pin Python packages and base image digests; generate an SBOM and scan each image.
- Download weights during a controlled image/build or model-preparation step. Production request paths never download from Hugging Face.
- Keep interactive and audiobook-batch queues separate so long books cannot starve previews.
- Keep at least one warm instance for the primary Fast route after demand justifies it; scale batch pools to zero where cold-start latency is acceptable.
- Workers poll a managed durable workflow service outbound and use short-lived object-storage credentials.
- Store raw reference audio and manuscripts encrypted; never place them in workflow history, logs, traces, or error payloads.
- Route by measured capability and available approved capacity. A managed provider fallback must return the same artifact/provenance contract.
- Disable an unhealthy model through a versioned Admin action with reason, actor, timestamp, and rollback target.

## 10. Local development inventory

The inspected machine has an NVIDIA GTX 1050 Ti with 4 GB VRAM. On 2026-08-03 its Hugging Face cache contained:

- complete Qwen3-0.6B text-model weights;
- LuxTTS weights and artifacts;
- Kokoro weights with only a small locally cached voice subset;
- Whisper tiny, base, and large-v3-turbo snapshots;
- Qwen3-TTS 0.6B and 1.7B Base directories containing configuration only, not full weights;
- no Fish S2-Pro snapshot.

Local smoke tests should prioritize Qwen3-0.6B, LuxTTS, Kokoro, and Whisper. Qwen TTS may be attempted only after a complete download and an eager/FP16-compatible configuration. Larger Qwen, TADA, Fish, and MOSS production benchmarks run on managed GPU hardware. The local cache is mounted read-only and is never a production artifact source.

## 11. Evaluation program

### 11.1 Golden corpus

The versioned corpus includes:

- at least 200 English utterances spanning narration, dialogue, numbers, dates, abbreviations, punctuation, proper names, and difficult phonemes;
- 20 authorized reference voices across age-range, accent, pitch, and recording conditions;
- expressive/tag cases, including invalid and unsupported tags;
- at least ten chapter-length and two multi-hour audiobook projects;
- 50 utterances per candidate Beta language reviewed by qualified speakers;
- SFX prompts covering environment, Foley, human action, UI, vehicles, animals, and multi-event timing;
- noisy/clean transcription fixtures with known transcripts;
- safety fixtures for unauthorized impersonation, prompt injection, disallowed content, and consent revocation.

Fixtures contain no unlicensed production content. Reference consent and permitted benchmark use are documented.

### 11.2 Measures

| Area | Measures |
|---|---|
| Content fidelity | WER/CER, omissions, repetitions, hallucinated words, number/date accuracy |
| Voice | Embedding similarity, identity drift, accent retention, leakage from reference |
| Prosody | Human naturalness/appropriateness rating, pause and emphasis accuracy |
| Long-form | Cross-clip consistency, chapter failure rate, loudness/timbre drift |
| Tags/control | Requested-control success and literal-tag failure rate |
| SFX | Prompt relevance, event timing, artifacts, loopability, speech/music leakage |
| Transcription | WER/CER, timestamp error, diarization/segment accuracy |
| Performance | First-audio latency, real-time factor, warm/cold load, queue time, VRAM |
| Reliability | Timeout, OOM, cancellation, retry, corrupted/empty output |
| Economics | GPU seconds, provider cost, storage/egress, cost per accepted minute |

### 11.3 Provisional approval thresholds

- No critical safety, consent, or cross-tenant defect.
- English content WER at or below 5% on the AudiLink clean-narration set.
- Hallucinated or added lexical content below 0.1% of evaluated words.
- At least 98% technically successful jobs after one permitted retry.
- Human naturalness average at least 4.0/5 for GA routes, with no protected subgroup below 3.5.
- No severe identity shift in at least 95% of long-form reviewed segments.
- Fast warm real-time factor at or below 1.0; Balanced at or below 1.5; Studio publishes a measured batch estimate rather than a real-time promise.
- Generated masters pass the media loudness/peak and corruption checks.
- Every Beta language has a named reviewer and a published limitation statement.

Thresholds are versioned and may be tightened. Lowering a gate requires AI Platform, Product, and Trust & Safety approval recorded in Admin.

## 12. Metering

The model adapter reports usage; the billing service determines credits.

- TTS and voice clone: accepted output seconds multiplied by the model/quality revision.
- SFX: accepted output seconds multiplied by the SFX model revision.
- Transcription: accepted input seconds multiplied by the transcription revision.
- Voice design: a versioned design-operation fee plus any audition audio.
- Helper LLM: included in the parent workflow unless Admin deliberately creates a visible metered feature.
- Failed, moderated-before-run, or technically unusable output does not settle normal generation credits.

GPU time, retries, and provider spend remain internal cost measurements and do not retroactively change a displayed reservation.

## 13. Safety and provenance requirements

- Every clone request resolves an active ConsentRecord appropriate to private, public, or monetized use.
- Public figures and minors cannot be cloned or listed.
- Revoked voices cannot start new generation; existing lawful end-product rights follow the policy in the trust-and-safety document.
- Every asset stores whether it is synthetic, cloned, preset, uploaded, edited, or mixed; the exact model and source lineage remain auditable.
- Public samples and books display an AI/cloned disclosure.
- Use robust model-native watermarking where available, but never treat it as the only provenance mechanism.
- Model warnings, unexpected speech, and moderation signals are preserved for review.

## 14. Rollout and change control

1. Integrate adapters behind disabled flags.
2. Complete license review and container security review.
3. Run golden and cost suites on target hardware.
4. Approve model/language/mode and publish the model card.
5. Enable for staff, then private test accounts.
6. Validate billing and rollback.
7. Enable publicly only when the complete V1 launch gate is met.

The full commercial launch requires all approved V1 engine families, including commercially licensed Fish. A degraded engine can be temporarily disabled after launch for safety or reliability without corrupting existing projects; the UI must explain the outage and offer an explicit compatible fallback.

## 15. Sources

- [Voicebox repository and engine overview](https://github.com/jamiepine/voicebox)
- [Voicebox project status and engine comparison](https://github.com/jamiepine/voicebox/blob/main/docs/PROJECT_STATUS.md)
- [Qwen3-TTS official repository](https://github.com/QwenLM/Qwen3-TTS)
- [Fish S2-Pro model card](https://huggingface.co/fishaudio/s2-pro)
- [Fish Speech license](https://github.com/fishaudio/fish-speech/blob/main/LICENSE)
- [MOSS-TTS family and license](https://github.com/OpenMOSS/MOSS-TTS)
- [LuxTTS model card](https://huggingface.co/YatharthS/LuxTTS)
- [Chatterbox repository and license](https://github.com/resemble-ai/chatterbox)
- [TADA model card](https://huggingface.co/HumeAI/tada-1b)
- [Kokoro model card](https://huggingface.co/hexgrad/Kokoro-82M)
- [Whisper repository](https://github.com/openai/whisper)
- [Qwen3-0.6B model card](https://huggingface.co/Qwen/Qwen3-0.6B)
