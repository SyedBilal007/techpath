'use client';

import { useState } from 'react';
import { Copy, Share2, Printer, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { usePathname } from 'next/navigation';
import { getSiteMetadata } from '@/lib/env';

interface ShareBarProps {
  title: string;
}

export function ShareBar({ title }: ShareBarProps) {
  const [copied, setCopied] = useState(false);
  const pathname = usePathname();
  const siteMetadata = getSiteMetadata();
  const fullUrl = `${siteMetadata.url}${pathname}`;

  const handleCopyRoadmap = async () => {
    if (typeof window === 'undefined') return;

    try {
      // Extract step names from the page (use checklist as primary source)
      const stepNames = new Set<string>();
      const stepElements = document.querySelectorAll('[data-checklist-step]');
      
      stepElements.forEach((el) => {
        const stepName = el.getAttribute('data-checklist-step');
        if (stepName) {
          stepNames.add(stepName);
        }
      });

      // Fallback to data-step-name if checklist not found
      if (stepNames.size === 0) {
        document.querySelectorAll('[data-step-name]').forEach((el) => {
          const stepName = el.getAttribute('data-step-name');
          if (stepName) {
            stepNames.add(stepName);
          }
        });
      }

      // Convert to array and number them
      const steps = Array.from(stepNames).map((name, index) => `${index + 1}. ${name}`);

      const roadmapText = steps.length > 0
        ? `${title}\n\n${steps.join('\n')}\n\nView full roadmap: ${fullUrl}`
        : `${title}\n\nView full roadmap: ${fullUrl}`;

      await navigator.clipboard.writeText(roadmapText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy roadmap:', error);
    }
  };

  const handleShare = async () => {
    if (typeof window === 'undefined') return;

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url: fullUrl,
        });
      } catch (error) {
        // User cancelled or error occurred, fallback to copy
        if ((error as Error).name !== 'AbortError') {
          handleCopyRoadmap();
        }
      }
    } else {
      // Fallback to copy
      handleCopyRoadmap();
    }
  };

  const handlePrint = () => {
    if (typeof window === 'undefined') return;
    window.print();
  };

  return (
    <div className="flex items-center justify-center gap-2 py-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyRoadmap}
            className="gap-2"
            aria-label="Copy roadmap to clipboard"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy Roadmap
              </>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Copy roadmap steps as a numbered list</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="gap-2"
            aria-label="Share roadmap"
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Share this roadmap via native share dialog</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
            className="gap-2"
            aria-label="Print roadmap as PDF"
          >
            <Printer className="h-4 w-4" />
            Print PDF
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Print or save as PDF</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

