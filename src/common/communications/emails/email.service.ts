import { Injectable } from '@nestjs/common';
import * as React from 'react';
import { VercelInviteUserEmail } from 'transactional/emails/vercel-invite-user';
import { renderAsync } from '@react-email/render';

@Injectable()
export class EmailService {
  constructor() {}

  renderVercelInviteUser() {
    return renderAsync(
      React.createElement(
        VercelInviteUserEmail,
        VercelInviteUserEmail.PreviewProps,
      ),
    );
  }
}
