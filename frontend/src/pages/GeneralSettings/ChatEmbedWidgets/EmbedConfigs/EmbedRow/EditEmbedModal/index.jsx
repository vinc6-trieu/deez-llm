import Embed from "@/models/embed";
import { safeJsonParse } from "@/utils/request";
import showToast from "@/utils/toast";
import { X } from "@phosphor-icons/react";
import React, { useState } from "react";
import {
    BooleanInput,
    ChatModeSelection,
    NumberInput,
    PermittedDomains,
    TextInput,
    WorkspaceSelection,
    enforceSubmissionSchema,
} from "../../NewEmbedModal";

export default function EditEmbedModal({ embed, closeModal }) {
  const [error, setError] = useState(null);

  const handleUpdate = async (e) => {
    setError(null);
    e.preventDefault();
    const form = new FormData(e.target);
    const data = enforceSubmissionSchema(form);
    const { success, error } = await Embed.updateEmbed(embed.id, data);
    if (success) {
      showToast("Embed updated successfully.", "success", { clear: true });
      setTimeout(() => {
        window.location.reload();
      }, 800);
    }
    setError(error);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div className="relative w-full max-w-2xl bg-theme-bg-secondary rounded-lg shadow border-2 border-theme-modal-border">
        <div className="relative p-6 border-b rounded-t border-theme-modal-border">
          <div className="w-full flex gap-x-2 items-center">
            <h3 className="text-xl font-semibold text-white overflow-hidden overflow-ellipsis whitespace-nowrap">
              Update embed #{embed.id}
            </h3>
          </div>
          <button
            onClick={closeModal}
            type="button"
            className="absolute top-4 right-4 transition-all duration-300 bg-transparent rounded-lg text-sm p-1 inline-flex items-center hover:bg-theme-modal-border hover:border-theme-modal-border hover:border-opacity-50 border-transparent border"
          >
            <X size={24} weight="bold" className="text-white" />
          </button>
        </div>
        <div className="px-7 py-6">
          <form onSubmit={handleUpdate}>
            <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
              <WorkspaceSelection defaultValue={embed.workspace.id} />
              <ChatModeSelection defaultValue={embed.chat_mode} />
              <PermittedDomains
                defaultValue={
                  safeJsonParse(embed.allowlist_domains, null) || []
                }
              />
              <NumberInput
                name="max_chats_per_day"
                title="Max chats per day"
                hint="Limit the amount of chats this embedded chat can process in a 24 hour period. Zero is unlimited."
                defaultValue={embed.max_chats_per_day}
              />
              <NumberInput
                name="max_chats_per_session"
                title="Max chats per session"
                hint="Limit the amount of chats a session user can send with this embed in a 24 hour period. Zero is unlimited."
                defaultValue={embed.max_chats_per_session}
              />
              <NumberInput
                name="message_limit"
                title="Message History Limit"
                hint="The number of previous messages to include in the chat context. Default is 20."
                defaultValue={embed.message_limit}
              />
              <BooleanInput
                name="allow_model_override"
                title="Enable dynamic model use"
                hint="Allow setting of the preferred LLM model to override the workspace default."
                defaultValue={embed.allow_model_override}
              />
              <BooleanInput
                name="allow_temperature_override"
                title="Enable dynamic LLM temperature"
                hint="Allow setting of the LLM temperature to override the workspace default."
                defaultValue={embed.allow_temperature_override}
              />
              <BooleanInput
                name="allow_prompt_override"
                title="Enable Prompt Override"
                hint="Allow setting of the system prompt to override the workspace default."
                defaultValue={embed.allow_prompt_override}
              />
              <TextInput
                name="brand_image_url"
                title="Logo URL"
                hint="URL of the image to use as the chat header logo. Leave blank to use the default AnythingLLM logo."
                placeholder="https://example.com/logo.png"
                defaultValue={embed.brand_image_url ?? ""}
              />
              <TextInput
                name="assistant_name"
                title="Assistant Name"
                hint='Name displayed in the chat header. Default is "AnythingLLM Chat Assistant".'
                placeholder="AnythingLLM Chat Assistant"
                defaultValue={embed.assistant_name ?? ""}
              />
              <TextInput
                name="assistant_icon"
                title="Assistant Avatar URL"
                hint="URL of the image to use as the assistant avatar shown next to chat messages."
                placeholder="https://example.com/avatar.png"
                defaultValue={embed.assistant_icon ?? ""}
              />
              <TextInput
                name="language"
                title="Widget Language"
                hint="Language code for the chat widget (e.g. en, vn, zh, fr, de, es, ja, ko). Default is en."
                placeholder="en"
                defaultValue={embed.language ?? "en"}
              />
              <BooleanInput
                name="no_sponsor"
                title={'Hide "Powered by" text'}
                hint={'Remove the "Powered by AnythingLLM" link at the bottom of the chat widget.'}
                defaultValue={embed.no_sponsor ?? false}
              />
              <TextInput
                name="sponsor_text"
                title={'Custom "Powered by" text'}
                hint={'Replace "Powered by AnythingLLM" with your own branding. Only shown when "Hide Powered by" is off.'}
                placeholder="Powered by My Company"
                defaultValue={embed.sponsor_text ?? ""}
              />
              <TextInput
                name="sponsor_link"
                title={'Custom "Powered by" link'}
                hint="URL for the custom sponsor link."
                placeholder="https://mycompany.com"
                defaultValue={embed.sponsor_link ?? ""}
              />

              {error && <p className="text-red-400 text-sm">Error: {error}</p>}
              <p className="text-white text-opacity-60 text-xs md:text-sm">
                After creating an embed you will be provided a link that you can
                publish on your website with a simple
                <code className="border-none bg-theme-settings-input-bg text-white mx-1 px-1 rounded-sm">
                  &lt;script&gt;
                </code>{" "}
                tag.
              </p>
            </div>
            <div className="flex justify-between items-center mt-6 pt-6 border-t border-theme-modal-border">
              <button
                onClick={closeModal}
                type="button"
                className="transition-all duration-300 text-white hover:bg-zinc-700 px-4 py-2 rounded-lg text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="transition-all duration-300 bg-white text-black hover:opacity-60 px-4 py-2 rounded-lg text-sm"
              >
                Update embed
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
