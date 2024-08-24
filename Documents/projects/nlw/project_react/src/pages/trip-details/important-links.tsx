import { Link2, Plus } from "lucide-react";
import { Button } from "../../componentes/button";
import { useEffect, useState } from "react";
import { CreateAddLinkModal } from "../trip-details/Add_link_modal";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface Link {
  title: string;
  url: string;
}

export function ImportantLinks() {
  const [isAddLinkModalOpen, SetIsAddLinkModalOpen] = useState(false);

  function openAddLinkModal() {
    SetIsAddLinkModalOpen(true);
  }
  function closeAddLinkModal() {
    SetIsAddLinkModalOpen(false);
  }

  const { tripId } = useParams();
  const [links, setLinks] = useState<Link[]>([]);

  useEffect(() => {
    api.get(`/trips/${tripId}/links`).then((response) => {
      setLinks(response.data.links);
    });
  }, [tripId]);

  return (
    <div className="space-y-6 ">
      <h2 className="font-semibold text-xl">Links importantes</h2>
      <div className="space-y-5">
        {links.map((link) => {
          return (
            <div
              key={link.title}
              className="flex items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <span className="block font-medium text-zinc-100">
                  {link.title}
                </span>
                <a
                  href={link.url}
                  className="block text-xs text-zinc-400 truncate hover:text-zinc-300"
                >
                  {link.url}
                </a>
              </div>
              <div className="flex items-center justify-between">
                <Link2 className="text-zinc-400 size-5" />
              </div>
            </div>
          );
        })}

        <Button onClick={openAddLinkModal} variant="secondary" size="full">
          <Plus className="size-5" />
          Cadastrar novo link
        </Button>

        {isAddLinkModalOpen && (
          <CreateAddLinkModal closeAddLinkModal={closeAddLinkModal} />
        )}
      </div>
    </div>
  );
}
