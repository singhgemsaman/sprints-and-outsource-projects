import './style.css'
import { extractTextFromPDF } from "./pdfParser.js";

const form = document.getElementById("form");
const container = document.getElementById("container");
const copy_btn = document.getElementById("copy_btn");
let Resume_text = null;
const modeBtn = document.getElementById("switchmode");
let mode = 0;
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;


modeBtn.addEventListener("click", switchmode);
function switchmode() {
    mode ^= 1;

    container.innerHTML = `<div class="flex flex-col items-center justify-center w-full">
                <p>You are in Demo mode.</p>
                <p>Switch to AI mode for AI customized cover letter.</p>
            </div> `;

    if (mode) {
        container.innerHTML = `
            
            <div class="flex items-center justify-center p-1 w-full">
                <label for="dropzone-file" class="border border-dashed h-50 w-150">
                    <div id="dropzone_text" class="flex flex-col items-center justify-center text-body pt-5 pb-6">
                        <svg class="w-8 h-8 m-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h3a3 3 0 0 0 0-6h-.025a5.56 5.56 0 0 0 .025-.5A5.5 5.5 0 0 0 7.207 9.021C7.137 9.017 7.071 9 7 9a4 4 0 1 0 0 8h2.167M12 19v-9m0 0-2 2m2-2 2 2"/></svg>
                        <span class="font-semibold">Click to upload</span>
                        <p class="text-xs">Resume PDF (MAX. 2 pages)</p>
                    </div>
                    <input id="dropzone-file" type="file" class="hidden" accept=".pdf" />
                </label>
            </div> 

        `;
        document.getElementById("dropzone-file").addEventListener("change", async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            Resume_text = await extractTextFromPDF(file);
            document.getElementById("dropzone_text").innerHTML += `
                <p id="file_name" class="text-sm font-semibold border m-2 px-2 rounded text-green-600">${file.name}</p>
            `;
        });
    }
}


async function generate_AI(input) {

    const prompt_payload = `
        You are a professional cover letter writer.

        Write a cover letter using ONLY the data provided below. 
        Do not invent any information not present in the input.

        CANDIDATE DATA:
        - Name: ${input.name}
        - Applying for: ${input.role} at ${input.company}
        - Key Skills: ${input.skills}
        - Job Description: ${input.description || "Not provided"}
        - Resume: ${Resume_text || "Not provided"}

        STRICT FORMATTING RULES:
        - Return ONLY raw HTML. No markdown. No backticks. No explanations.
        - Use only <p> tags. No <h1>, no , no bullet points.
        - Structure must follow this exact order:

        <p>[City, today's Date]</p>

        <p>Dear Hiring Manager at ${input.company},</p>

        <p>[Opening paragraph: who the candidate is, what role they are applying for, and a strong opening statement of intent]</p>

        <p>[Body paragraph: specific skills and how they match the job description. Reference resume details if provided.]</p>

        <p>[Closing paragraph: express enthusiasm, request for interview, thank them]</p>

        <p>Warm regards,<br>${input.name}</p>

        Return nothing outside these <p> tags.
    `;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            { text: prompt_payload }
                        ]
                    }
                ]
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("API Error:", data);
            container.innerHTML = `
                <div class="text-center text-red-500 font-semibold mt-65">
                    Error ${response.status}: ${data.error?.message || "Something went wrong. Try again."}
                </div>
            `;
            return;
        }

        const text = data.candidates[0].content.parts[0].text;
        container.innerHTML = `<div class="p-3 flex flex-col gap-5 overflow-y-auto">${text}</div>`;

    } catch (err) {
        console.error("Network Error:", err);
    }
}


function generate(input) {
    input.experience =
        input.experience.trim() === ""? "strong" : `${input.experience} years of`;

    container.innerHTML = `
        <div class="w-full h-full overflow-y-auto p-6 leading-7 whitespace-normal">
            <p>Dear Hiring Manager at ${input.company},</p>

            <br>

            <p>
                I am excited to apply for the ${input.role} position at
                ${input.company}. With ${input.experience} experience in
                ${input.skills}, I have developed the technical knowledge,
                problem-solving ability, and collaborative mindset needed to make a meaningful
                contribution to your team.
            </p>

            <br>

            <p>
                Throughout my projects and professional experience, I have consistently expanded
                my expertise in ${input.skills} while delivering reliable and high-quality
                solutions. I enjoy learning new technologies, adapting to challenges, and working
                closely with others to achieve shared goals.
            </p>

            <br>

            <p>
                What particularly attracts me to ${input.company} is the
                opportunity to contribute to innovative projects while continuing to grow as a
                ${input.role}. I am confident that my skills, enthusiasm, and
                dedication would make me a valuable addition to your organization.
            </p>

            <br>

            <p>
                Thank you for considering my application. I would welcome the opportunity to
                discuss how my background and skills align with your team's needs. I look forward
                to hearing from you.
            </p>

            <br>

            <p>
                Sincerely,<br>
                ${input.name}
            </p>
        </div>
    `;
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const catch_input = {
        name: document.getElementById("Name").value,
        role: document.getElementById("Job Role").value,
        company: document.getElementById("Target Company").value,
        skills: document.getElementById("Key Skills").value,
        experience: "",
        description: document.getElementById("Job Description").value
    }
    container.innerHTML = `
        <div class="font-bold text-5xl text-center mt-65">Generating...</div>
    `

    mode ? generate_AI(catch_input) : generate(catch_input);
});


copy_btn.addEventListener("click", copytext);
function copytext() {
    const text = container.innerText;
    navigator.clipboard.writeText(text);
}